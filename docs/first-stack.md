---
id: first-stack
title: My First Stack
sidebar_label: My First Stack
slug: /my-first-stack
---

- create a fresh stack
- add a server and deploy
- change something about it?
- add an output
- destroy it

## Creating the stack

## Creating an EC2 server


```javascript title="MyFirstStack.ts" {2,8-16}
import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";

export class MyFirstStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', {
      isDefault: true
    })

    new ec2.Instance(this, 'Instance', {
      vpc,
      instanceType: new ec2.InstanceType('t3.nano'),
      machineImage: ec2.MachineImage.latestAmazonLinux()
    })

  }
}
```

Run `cdk deploy` to start the deployment of the stack. This may take a few minutes, but once done you should see something like the below:

```bash
MyFirstStack: deploying...
MyFirstStack: creating CloudFormation changeset...


 ✅  MyFirstStack

Stack ARN:
arn:aws:cloudformation:eu-west-1:621485386042:stack/MyFirstStack/a70c6020-709b-11eb-9b63-06c31b364fbd
```

## Destroying the stack

As soon as we're finished with the server and no longer need it, we want to terminate it so that we aren't being charged for it being up.

To **destroy every resource that the stack has created**, run `cdk destroy` from the CLI. You will be asked if you are sure you want to destroy the stack:

```bash
Are you sure you want to delete: MyFirstStack (y/n)?
```

Type `y` and press enter to confirm, and then wait whilst the stack is torn down. Once the process is finished, the EC2 instance will have been terminated.

Now that you have created your first stack, we are ready to begin working on our ECS Microservices Stack.