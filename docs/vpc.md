---
id: vpc
title: Creating the VPC
sidebar_label: Creating the VPC
slug: /creating-the-vpc
---

## What is a VPC?

An [AWS Virtual Private Cloud](https://aws.amazon.com/vpc) (VPC) is a **logically isolated virtual network**, dedicated to your AWS account. With a VPC, you can specify the I.P. addresses the network should use, and place AWS resources you create (e.g. EC2 instances, ECS containers, RDS databases, etc) within it.

## What are subnets?

VPCs can be split into smaller networks, called subnets, which are defined by an I.P. range that is a subset of the VPC I.P. range. A subnet must be associated with a single [Availability Zone](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) (AZ) within the region the VPC is deployed in, and cannot span multiple AZs.

Subnets are said to be **public** if they are associated with a route table that has a route to an [**Internet Gateway**](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html) (IGW). Having this route in place enables inbound and outbound internet traffic to and from resources placed inside the subnet, exposing them to the internet.

Conversely, if a subnet does not contain such a route to an IGW, it is said to be a **private** subnet. Resources placed inside of private subnets are **not publically accessible from the internet**, and to send outbound traffic out to the internet, they must do so via a [**Nat Gateway**](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html) or Nat Instance, which allow resources to talk out to the internet without being publically exposed themselves.


## Our VPC requirements

We want the VPC we build to contain **subnets in different Availability Zones**, so that we can place resources across them for **high availability**. If one AZ were to experience an outage, our application would not go down, as it would continue being served from the other AZs.

We also want both **public subnets**, where we can put things that need to be reachable by the internet (e.g. load balancers), and **private subnets**, where we can put things that we don't want exposed to the internet (e.g. application containers), so we can follow best security practices.

To achieve this we will need to create multiple **subnets**, an **Internet Gateway**, multiple **NAT Gateways**, and all the necessary configuration between the resources.


## Creating the VPC with CDK

To build a VPC with all of the above requirements, add the highlighted lines to the stack: 

```javascript title="lib/translatr-cdk-stack.ts" {3,9-12}
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

export class TranslatrCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'ClusterVpc', {
        cidr: '10.0.0.0/16',
        maxAzs: 2
    })

  }
}
```

Run `cdk deploy` to deploy the changes to the stack.


## Viewing the VPC

Once the deploy of the stack has successfully finished, [take a look in the AWS console](https://eu-west-1.console.aws.amazon.com/vpc/home?region=eu-west-1) (make sure you're looking at the region you are deploying to) and find your VPC.

The following resources will have been created and configured in your AWS account:

- A VPC with the CIDR block of `10.0.0.0/16` (65,536 I.P. addresses).
- Two public subnets, each in a different Availability Zone.
- An Internet Gateway (IGW), associated with the VPC.
- Routes added to the IGW in each of the two public subnet's route tables.
- Two private subnets, each in a different Availability Zone.
- A NAT Gateway for each private subnet.
- Routes added to the NAT Gateways in each of the two private subnet's route tables.

:::note How does this work?
By default, the `Vpc` construct will create a public and private subnet in each AZ in the region being deployed to, up to the maximum defined in the `maxAzs` option (defaulting to 3). It will automatically assign the subnet CIDR blocks, create an Internet Gateway, the NAT Gateways, and hook them all up together.
:::

## Creating a bastion host

We've created the VPC, which contains two private subnets. Any resources deployed into these subnets, won't be reachable from outside of the VPC (e.g. from our local machines). When we're poking around and testing some of the things we deploy later, we would like to be able to connect to these resources to verify things are working as expected. 

To do this, we will need to have an EC2 instance in a *public* subnet (reachable over the internet), from which we will be able to connect to resources in the private subnets. An instance used in this way is called a *bastion* or *jump* host. We will quickly create one now so we can use it when we need to later.

:::note Security note
A real, production-grade bastion host would be security-hardened to protect against unauthorised use. This is fine for the purpose of the workshop.
:::

```javascript title="lib/translatr-cdk-stack.ts" {14}
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

export class TranslatrCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'ClusterVpc', {
        cidr: '10.0.0.0/16',
        maxAzs: 2
    })

    new ec2.BastionHostLinux(this, 'Bastion', { vpc })

  }
}
```

Run `cdk deploy` again to create the bastion instance. Head back to your [AWS console](https://eu-west-1.console.aws.amazon.com/ec2/v2/home?region=eu-west-1#Instances:) to see the EC2 instance.