---
id: writing-constructs
title: Writing constructs
sidebar_label: Writing constructs
slug: /writing-constructs
---


[Constructs](https://docs.aws.amazon.com/cdk/latest/guide/constructs.html) are the "basic building blocks of CDK apps" - they represent a "cloud component", be it a single resource like an [EC2 instance](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ec2.Instance.html) or an [S3 bucket](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-s3.Bucket.html) - or a higher level component consisting of several AWS resources all working together.

In this workshop we've used lots of different constructs, ranging from simple single resource components, to very high level ones that create many resources.

When [creating the frontend service](frontend-service.md), we used the `ApplicationLoadBalancedFargateService` construct from the `ecs-patterns` module. This construct creates all the AWS resources needed for a publically available, load balanced Fargate service - the ECS task definition and service, the Application Load Balancer, and all the other various bits and pieces needed.

These higher level constructs are very useful as they enable developers to create complex AWS architecture with a small amount of code. Configuration for the constructs can be provided to alter how they are deployed or behave, and the authors of the construct can provide sensible defaults.

Constructs can also be used across an organisation to ensure that components are architected following best practices and policy requirements.

## Creating a Construct

We will extract the CDK we wrote to create the backend service into its own `BackendService` construct, so that it is reusable.

We, and other developers, can then use this to bring up a backend service, where we just need to specify the things that are unique - the container image, the service name, etc.

### Create the Construct

Create a new file called `lib/backend-service.ts` in the stack project, and place the following code inside:

```javascript title="lib/backend-service.ts"
import { Construct } from 'constructs';

export interface BackendServiceProps {
}

export class BackendService extends Construct {

  constructor(scope: Construct, id: string, props: BackendServiceProps) {
    super(scope, id);
  }
}
```

This is the bare bones skeleton for a construct. At the top we define the schema for the properties/configuration for the construct (currently empty) and below we define the resources that the construct will create for us.

### Defining construct properties


We start by defining what properties/configuration our construct will accept.




```javascript title="lib/backend-service.ts"{2,5-9}
import { Construct } from 'constructs';
import { aws_ecs as ecs, aws_iam as iam } from 'aws-cdk-lib';

export interface BackendServiceProps {
  cluster: ecs.Cluster;
  containerImage: ecs.ContainerImage;
  instances: number;
  serviceName: string;
  taskRoleManagedPolicies: iam.IManagedPolicy[]
}

export class BackendService extends Construct {

  constructor(scope: Construct, id: string, props: BackendServiceProps) {
    super(scope, id);
  }
}
```

The construct will ask for the ECS cluster in which the service is to be created - note that this is the Construct object, not a name. So users of this construct can create/retrieve the cluster in whatever they want, and pass it in the props.

We also ask for the container image to run, the number of instances of the container to be up at any given time, the name of the service, and an array of any Managed IAM Policies that the container should have attached.

These are all things that are **unique to our service** - everything else would be the same across different backend applications.


### Porting over the code


Now we can port the code over from our stack into the construct, making small changes here and there to use the properties provided by the user of the construct.

```javascript title="lib/backend-service.ts"{17-53}
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_iam as iam } from 'aws-cdk-lib';

export interface BackendServiceProps {
  cluster: ecs.Cluster;
  containerImage: ecs.ContainerImage;
  instances: number;
  serviceName: string;
  taskRoleManagedPolicies: iam.IManagedPolicy[]
}

export class BackendService extends Construct {

  constructor(scope: Construct, id: string, props: BackendServiceProps) {
    super(scope, id);

    // Create the task definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, id + '_TaskDefinition');

    // Add all the managed policies to the task role
    for (let policy of props.taskRoleManagedPolicies) {
        taskDefinition.taskRole.addManagedPolicy(policy);
    }

    // Add the container to the task definition
    const container = taskDefinition.addContainer('app', {
        image: props.containerImage,
        logging: new ecs.AwsLogDriver({ streamPrefix: props.serviceName })
    })

    // Expose port 80 on the container
    container.addPortMappings({
        containerPort: 80,
        hostPort: 80
    })

    // Allow inbound traffic from within the VPC on port 80
    const appTaskDefinitionSecurityGroup = new ec2.SecurityGroup(this, id + '_ServiceSecurityGroup', {
        vpc: props.cluster.vpc,
        securityGroupName: props.serviceName  + '-sg'
    })
    appTaskDefinitionSecurityGroup.addIngressRule(ec2.Peer.ipv4(this.cluster.vpc.vpcCidrBlock), ec2.Port.tcp(80));

    // Create the ECS service
    const service = new ecs.FargateService(this, id + '_Service', {
        cluster: props.cluster,
        taskDefinition: taskDefinition,
        desiredCount: props.instances,
        securityGroups: [appTaskDefinitionSecurityGroup],
        cloudMapOptions: {
            name: props.serviceName
        }
    })

  }
}
```

We've made some tweaks here and there to the code to use the props of the construct, but it is pretty much the same.


### Retrieving data from constructs

Sometimes we will want to retireve data or child constructs from constructs so that we can use them in the stack. For our stack, we have an output that shows the URL of the backend service. 

Add the highlighted lines below to define a readonly property of the construct, which will expose the URL of the service being created.

```javascript title="lib/backend-service.ts"{7,24}
import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';

...

export class BackendService extends Construct {

  public readonly serviceUrl: string;

  constructor(scope: Construct, id: string, props: BackendServiceProps) {
    
        ...

        // Create the ECS service
        const service = new ecs.FargateService(this, id + '_Service', {
            cluster: props.cluster,
            taskDefinition: translateApiTaskDefinition,
            desiredCount: props.instances,
            securityGroups: [appTaskDefinitionSecurityGroup],
            cloudMapOptions: {
                name: props.serviceName
            }
        })

        this.serviceUrl = "http://" + service.cloudMapService!.serviceName + "." + service.cloudMapService!.namespace.namespaceName;

  }
}
```

### Using the construct in the stack

We can now delete lines X-X in the stack and add the highlighted lines:

```javascript title="lib/translatr-cdk-stack.ts" {4,22-32}
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_iam as iam, aws_servicediscovery as servicediscovery } from 'aws-cdk-lib';
import { BackendService } from './backend-service';

export class TranslatrCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    ...

    const cluster = new ecs.Cluster(this, 'EcsCluster', {
        vpc,
        clusterName: 'translatr',
        defaultCloudMapNamespace: {
            name: 'local',
            type: servicediscovery.NamespaceType.DNS_PRIVATE,
            vpc
        }
    })

    const backend = new Backend(this, 'TranslateBackendService', {
        cluster,
        containerImage: ecs.ContainerImage.fromRegistry('public.ecr.aws/f0u6x9s9/ecs-microservices-translate-api'),
        instances: 3,
        serviceName: 'translate-api',
        taskRoleManagedPolicies: [
            iam.ManagedPolicy.fromAwsManagedPolicyName('TranslateFullAccess')
        ]
    })

    let translateApiUrl = backend.serviceUrl

    ...

  }
}
```

The stack is now using the `BackendService` construct!