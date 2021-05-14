---
id: cluster
title: Creating the ECS cluster
sidebar_label: Creating the ECS cluster
slug: /creating-the-ecs-cluster
---

Now we have the VPC created in which our application is going to live, we will create the "cluster" in which we deploy our services into via containers.

## Creating the ECS Cluster with CDK

Change/add the highlighted lines below into the stack.

```javascript title="lib/translatr-cdk-stack.ts" {3,16-19}
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_ecs as ecs } from 'aws-cdk-lib';

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

  }
}
```

Run `cdk deploy` again to deploy the changes to the stack and create the cluster.

Next, we will look at deploying the first service our app uses into the cluster.