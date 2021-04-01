---
id: vpc
title: Creating the VPC
sidebar_label: Creating the VPC
slug: /creating-the-vpc
---

## What is a VPC?

An [AWS Virtual Private Cloud](https://aws.amazon.com/vpc) (VPC) is a **logically isolated** virtual network, dedicated to your AWS account. With a VPC, you can specify the I.P. addresses the network should use, and place AWS resources you create (e.g. EC2 instances, RDS databases, etc) within it.

## What are subnets?

VPCs can be split into smaller networks, called subnets, which are defined by an I.P. range that is a subset of the VPC I.P. range. A subnet must be associated with a single Availability Zone (AZ) within the region the VPC is deployed to, and cannot span multiple AZs.

Subnets are said to be **public** if they are associated with a route table that has a route to an **Internet Gateway (IGW)**. Having this route in place enables inbound and outbound internet traffic to resources placed inside the subnet, exposing them to the internet.

Conversly, if a subnet does not contain such a route to an IGW, it is said to be a **private** subnet. Resources placed inside of private subnets are not publically accessible from the internet, and to send outbound traffic out to the internet, they must do so via a **Nat Gateway** of **Nat Instance**, which allow resources to talk out to the internet without being exposed themselves.


## Our VPC requirements

We want the VPC we build to contain **subnets in different Availability Zones (AZs)**, so that we can place resources across them for **high availability**. If one AZ were to experience an outage, our application would not go down, as it would continue being served from the other AZs.

We also want both **public subnets**, where we can put things that need to be reachable by the internet (e.g. load balancers), and **private subnets**, where we can put things that we don't want exposed to the internet (e.g. application containers), so we can follow best security practices.

To achieve this we will need to create multiple **subnets**, an **Internet Gateway (IGW)**, multiple **NAT Gateways**, and all the necessary configuration between the resources.


## Creating the VPC with CDK

To build a VPC with all of the above requirements, first we need to add the `@aws-cdk/aws-ec2` dependency to our stack, which will give us constructs for building resources relating to VPCs & EC2. 

Stop the `npm run watch` command and run the following command: 

```bash
npm install @aws-cdk/aws-ec2 --save && npm run watch
```

Next, add the highlighted lines to the stack:

```javascript title="lib/translatr-cdk-stack.ts" {2,8-11}
import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";

export class TranslatrCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
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

Once the deploy of the stack has successfully finished, [take a look in the AWS console](https://eu-west-1.console.aws.amazon.com/vpc/home?region=eu-west-1) and find your VPC.

The following resources will have been created and configured in your AWS account:

- A VPC with the CIDR block of `10.0.0.0/16`.
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

We've created the VPC, which contains two private subnets. Any resources deployed into these subnets, won't be reachable from outside of the VPC (e.g. from our local machines). When we're poking around and testing some of the things we deploy later, we will need to have an instance in a *public* subnet, from which we will be able to connect to resources in the private subnets.

An instance used in this way is called a *bastion* or *jump* host. We will quickly create one now so we can use it when we need to later.

:::note Security note
A real, production-grade bastion host would be security-hardened to protect against unauthorised use. This is just for demo purposes.
:::

```javascript title="lib/translatr-cdk-stack.ts" {13-16}
import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";

export class TranslatrCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'ClusterVpc', {
        cidr: '10.0.0.0/16',
        maxAzs: 2
    })

    // Create a bastion EC2 instance we can use to connect to resources in private subnets
    const bastion = new ec2.BastionHostLinux(this, 'Bastion', {
      vpc
    })

  }
}
```

Run `cdk deploy` again to create the bastion instance.

Now the VPC is created, we are ready to continue on to creating the ECS Cluster, in which the app's services will run.