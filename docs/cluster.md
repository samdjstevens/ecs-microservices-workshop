---
id: cluster
title: Creating the ECS cluster
sidebar_label: Creating the ECS cluster
slug: /creating-the-ecs-cluster
---

The first thing we must do when using AWS ECS is to create a [cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html), which is a **logical grouping of tasks or services**. We will be using [AWS Fargate](https://aws.amazon.com/fargate/) to run our tasks, which means we don't need to worry about provisioning any EC2 instances for our cluster, as AWS will take care of this for us.

## Creating the ECS Cluster with CDK

To create the cluster, change/add the highlighted lines in the stack:

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

Run `cdk deploy` again to deploy the changes to the stack and head back to the [AWS console](https://eu-west-1.console.aws.amazon.com/ecs/home?region=eu-west-1#/clusters), where you should now be able to see the cluster.

We are now ready to deploy the first service that our app is comprised of, into the cluster.