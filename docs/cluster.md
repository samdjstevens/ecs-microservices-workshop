---
id: cluster
title: Creating the Cluster
sidebar_label: Creating the Cluster
slug: /cluster
---

Now we have the VPC created in which our application is going to live, we will create the "cluster" in which we deploy our services into via containers.

## Using Elastic Container Service

We are going to use **Elastic Container Service** to run the docker containers of the application. With ECS, we will be using the **Fargate** capacity provider, meaning we won't have to provision, manage, or even think about EC2 servers to run the containers on - this is all handled and asbtracted away by AWS.

In **ECS**, a cluster is *"a logical grouping of tasks or services"*. The services which run in a cluster are ran on underlying infrastructure by eithe EC2 or Fargate. TODO more on this.

## Creating an ECS Cluster in CDK

We must add another CDK dependency to our stack first before we can tell CDK to create the cluster. This time it's the `@aws-cdk/aws-ecs` package. Stop the `npm run watch` command and run the following commands: 

```bash
npm install @aws-cdk/aws-ecs --save
npm run watch
```

Next, add the highlighted lines below into the stack.

```javascript title="lib/ecs-microservices-stack.ts" {3,14-18}
import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";

export class EcsMicroservicesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'ClusterVpc', {
        cidr: '10.0.0.0/16',
        maxAzs: 2
    })

    // Create a new ECS cluster in the VPC
    const cluster = new ecs.Cluster(this, 'EcsCluster', {
        vpc,
        clusterName: 'translattr',
    })

  }
}
```

Run `cdk deploy` again to deploy the changes to the stack and create the cluster.

Next, we will look at deploying the first service our app uses into the cluster.