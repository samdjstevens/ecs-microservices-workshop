---
id: first-service
title: Adding a Service
sidebar_label: Adding a Service
slug: /adding-a-service
---

[TODO]
- What the service is
- What were going to do

### Source Code / What it does
[TODO]
- Link to source code of app


### Creating the Task Definition
[TODO]
- What is a task definition

```javascript
// TODO: code change for adding IAM and ECR dependencies
// Create the task definition
const taskDefinition = new ecs.FargateTaskDefinition(this, 'TranslateApiTaskDef');

// Give the container in the task definition access to Amazon Translate
taskDefinition.taskRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('TranslateFullAccess'));

const repo = ecr.Repository.fromRepositoryName(this, 'Repo', 'ecs-microservices-translate-api');
const container = taskDefinition.addContainer('app', {
    image: ecs.ContainerImage.fromEcrRepository(repo),
    logging: new ecs.AwsLogDriver({ streamPrefix: 'translate-api' })
})

// Expose port 80 on the container
container.addPortMappings({
    containerPort: 80,
    hostPort: 80
})
```

In this addition, we create a new Task Definition that will run on **Fargate**, and assign the AWS managed ["TranslateFullAccess" IAM policy](https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/TranslateFullAccess$jsonEditor) to it. By doing this, we give the app that will be running in the container inside this task the permissions to make the API calls to AWS Translate service.

Next, we add a single container to the task definition, specifying the **Elastic Container Registry** where the app image lives, and that we want to use the AWS log driver for the container logs. When using this driver, AWS will automatically create a log group in Cloudwatch Logs and ship the container logs to it.

To finish the Task Definition, we add the port mappings on the container, exposing the application which is listening on port 80.

### Creating the service

We have the task definition, but need something to actually specify how we want to run it. TODO add more.

```javascript
// Allow inbound traffic from within the VPC on port 80
const appTaskDefinitionSecurityGroup = new ec2.SecurityGroup(this, 'MySecGroup', {
    vpc,
    securityGroupName: 'translate-api-sg'
})
sg.addIngressRule(ec2.Peer.ipv4(vpc.vpcCidrBlock), ec2.Port.tcp(port));

const service = new ecs.FargateService(this, 'TransateApiService', {
    cluster,
    serviceName: 'translate-api',
    taskDefinition: taskDefinition,
    desiredCount: 3,
    securityGroups: [appTaskDefinitionSecurityGroup]
})
```
We start by creating a **Security Group** which is like a firewall that controls what connections will be accepted and rejected. By default, the services on a cluster will have no security groups, which means all connections will be rejected. Security Groups are **statefull*, which basically means we don't need to explicitly state that the connection back to the originator is allowed.

In the security group, we allow all incoming connections from **within the VPC** to port 80 on our service. This means that requests to the service from within the VPC will be allowed, whilst requetss from outside of it (if the service was publically available) would be rejected.

We then create a new `FargateService`, specifying the cluster it should go in, the name, which task definition to use, how many instances of the task definition to run, and finally to use the security group we created.

## Making a request to the service

Our service should now be up and running, ready to handle translation requests - but how can we do a simple test to verify this?

Open up the AWS console and head to the [ECS cluster dashboard](https://eu-west-1.console.aws.amazon.com/ecs/home?region=eu-west-1#/clusters) where you should see the cluster that you previously created. Click on the cluster and open the **Services** tab, find the **translate-api** service, and click on the link. 

Open the **Tasks** tab to view the three running tasks. Click the Task UUID link on any of the tasks to view the details of the running task.

Look on this page for the **Private I.P.** address (note that the task does *not* have a public I.P address, as we have not publically exposed the tasks). The container running inside of this task will be reachable at port 80 on the private I.P. address listed. In my case, it's `10.0.154.29`.

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