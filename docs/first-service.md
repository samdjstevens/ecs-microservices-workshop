---
id: first-service
title: Creating an ECS Service
sidebar_label: Creating an ECS Service
slug: /adding-a-service
---

Our translation application is made up of two services. One service is the **frontend service**, which renders the UI to the user and handles the submission of their request to translate text.

The second service is the **backend translate-api service** - a JSON API service which accepts translation requests and returns responses containing the translated text.

We will start by deploying the **translate-api** service to the cluster first.

:::note Note
The docker images for the services used in this workshop have been pre-built and pushed to the AWS's container registry, ECR. The CDK we will write references the locations of these images when defining the infrastructure to run them. The source code of the services have been linked to if you wish to inspect them.
:::


### How it works

The translate-api service is a simple [Spring Boot](https://spring.io/projects/spring-boot) based application written in Java, that uses the AWS SDK to talk to the [Amazon Translate](https://aws.amazon.com/translate/) service. 

It has a single endpoint, `/translate`, which accepts a JSON body detailing the source language, target language, and the text to translate.

Example request:
```json
{
    "sourceLangCode": "en",
    "targetLangCode": "fr",
    "text": "Hello World!"
}
```

Example response:

```json
{
    "sourceLangCode": "en",
    "targetLangCode": "fr",
    "translatedText": "Bonjour le monde!"
}
```

### Source Code

[Click here](https://github.com/samdjstevens/ecs-microservices-translate-api) to view the source code of the service on GitHub.


### Pulling the application image from ECR

I have pushed the docker image for the service up to a [public ECR repository](https://gallery.ecr.aws/f0u6x9s9/ecs-microservices-translate-api), so that it can be pulled down by the ECS when deploying the task.

### Creating the Task Definition

To start creating the service which will run the docker containers of the application, we must first create a **task definition** describing how to run the container.

Add/change the highlighted lines below to the stack:

```javascript title="lib/translatr-cdk-stack.ts" {3,21-42}
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_iam as iam, aws_ecr as ecr } from 'aws-cdk-lib';

export class TranslatrCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'ClusterVpc', {
        cidr: '10.0.0.0/16',
        maxAzs: 2
    })

    new ec2.BastionHostLinux(this, 'Bastion', { vpc })

    const cluster = new ecs.Cluster(this, 'EcsCluster', {
        vpc,
        clusterName: 'translatr',
    })

    // Create the task definition
    const translateApiTaskDefinition = new ecs.FargateTaskDefinition(
        this, 
        'TranslateApiTaskDef'
    );

    // Give the container in the task definition access to Amazon Translate
    translateApiTaskDefinition.taskRole.addManagedPolicy(
        iam.ManagedPolicy.fromAwsManagedPolicyName('TranslateFullAccess')
    );

    const container = translateApiTaskDefinition.addContainer('app', {
        image: ecs.ContainerImage.fromRegistry('public.ecr.aws/f0u6x9s9/ecs-microservices-translate-api'),
        // Send logs from the container to Cloudwatch
        logging: new ecs.AwsLogDriver({ streamPrefix: 'translate-api' })
    })

    // Expose port 80 on the container
    container.addPortMappings({
        containerPort: 80,
        hostPort: 80
    })

  }
}
```

In this addition, we create a new Task Definition that will run on **Fargate**, and assign the AWS managed ["TranslateFullAccess" IAM policy](https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/TranslateFullAccess$jsonEditor) to it. By doing this, we give the app that will be running in the container inside this task the permissions to make the API calls to AWS Translate service.

Next, we add a single container to the task definition, specifying the **Elastic Container Registry** where the app image lives, and that we want to use the AWS log driver for the container logs. When using this driver, AWS will automatically create a log group in Cloudwatch Logs and ship the container logs to it.

To finish the Task Definition, we add the port mappings on the container, exposing the application which is listening on port 80.

### Creating the service

We have defined/created the task definition, and are now ready to create the service which will take care of running the instances of those tasks.

Add the highlighted lines below to the stack:

```javascript title="lib/translatr-cdk-stack.ts" {17-29}
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_iam as iam, aws_ecr as ecr } from 'aws-cdk-lib';

export class TranslatrCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    ...

    // Expose port 80 on the container
    container.addPortMappings({
        containerPort: 80,
        hostPort: 80
    })

    // Allow inbound traffic from within the VPC on port 80
    const appTaskDefinitionSecurityGroup = new ec2.SecurityGroup(this, 'TranslateApiServiceSecurityGroup', {
        vpc,
        securityGroupName: 'translate-api-sg'
    })
    appTaskDefinitionSecurityGroup.addIngressRule(ec2.Peer.ipv4(vpc.vpcCidrBlock), ec2.Port.tcp(80));

    const service = new ecs.FargateService(this, 'TransateApiService', {
        cluster,
        taskDefinition: translateApiTaskDefinition,
        desiredCount: 3,
        securityGroups: [appTaskDefinitionSecurityGroup]
    })

  }
}
```

We start by creating a **Security Group** which is like a firewall that controls what connections will be accepted and rejected. By default, the services on a cluster will have no security groups, which means all connections will be rejected. Security Groups are *stateful*, which basically means we don't need to explicitly state that the connection back to the originator is allowed.

In the security group, we allow all incoming connections from **within the VPC** to port 80 on our service. This means that requests to the service from within the VPC will be allowed, whilst requetss from outside of it (if the service was publically available) would be rejected.

We then create a new `FargateService`, specifying the cluster it should go in, which task definition to use, how many instances of the task definition to run, and finally to use the security group we created.

Run `cdk deploy` to deploy the changes to the stack and create the service.

## Making a request to the service

Our service should now be up and running, ready to handle translation requests - but how can we do a simple check to verify this?

Open up the AWS console and head to the [ECS cluster dashboard](https://eu-west-1.console.aws.amazon.com/ecs/home?region=eu-west-1#/clusters) where you should see the cluster that you previously created. Click on the cluster and open the **Services** tab, find the **translate-api** service, and click on the link. 

Open the **Tasks** tab to view the three running tasks. Click the Task UUID link on any of the tasks to view the details of the running task.

Look on this page for the **Private I.P.** address (note that the task does *not* have a public I.P. address, as we have not publically exposed the tasks). The container running inside of this task will be reachable at port 80 on the private I.P. address listed. In my case, it's `10.0.154.29`.

To connect to this private IP, we need to connect from a machine from within the VPC. Head to the [EC2 instances listing page](https://eu-west-1.console.aws.amazon.com/ec2/v2/home?region=eu-west-1#Instances), where you should see the [bastion host](vpc.md#creating-a-bastion-host) instance up and running. Connect to the EC2 instance by checking the box next to the instance and selecting *Actions > Connect*.

Choose **Session Manager** and hit *Connect*, and a terminal-like window open in the browser. Check the health endpoint of the translate-api service instance with the following command:

```bash
curl http://<Private-IP>/actuator/health
```

You should get back the following response:
```json
{ "status": "UP" }
```

The instance is healthy! Let's test the actual functionality of the service by issuing it a translation request:

```bash
curl --location --request POST 'http://<Private-IP>/translate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "sourceLangCode": "en",
    "targetLangCode": "de",
    "text": "You will face many defeats in life, but never let yourself be defeated."
}'
```

You should get the following response back:

```
{
    "sourceLangCode": "en",
    "targetLangCode": "de",
    "translatedText": "Du wirst mit vielen Niederlagen im Leben konfrontiert sein, aber lass dich niemals besiegen."
}
```

So we have a working service deployed onto the cluster, but there are a few problems. 

To get the I.P addresses of each instance of the service we need to manually locate it in the AWS console. We also have no way of balancing requests between the instances of the services. And to make matters worse, as instances come up and down from scaling, deployment, failure, etc, the I.P addresses of the running instances will change.

We can fix all these problems by making the instances of the service _discoverable_. Continue onto the next step to see how we can do this within AWS.