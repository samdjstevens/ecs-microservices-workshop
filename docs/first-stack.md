---
id: first-stack
title: My First Stack
sidebar_label: My First Stack
slug: /my-first-stack
---

Let's dive right in and create our first CDK stack. In the following steps, we will use CDK to provision an EC2 instance, make some changes to it, and retrieve some information about it, all as Infrastructure-as-Code.

## Creating the stack

To start creating your first CDK stack, create a new directory and move inside it by running the following command in the CLI:

```bash
mkdir my-first-stack && cd my-first-stack
```

Next, initialise the CDK project with the following command:

```bash
cdk init app --language typescript
```

In a new terminal window, inside the same directory, run:

```bash
npm run watch
```

This will start watching the project files for any changes and re-compile the typescript:

```bash
[15:51:00] Starting compilation in watch mode...

[15:51:06] Found 0 errors. Watching for file changes.
```

Your workspace is now ready to start exploring your stack.

### Exploring the project

Open up the directory in your editor and take a look at the `lib/my-first-stack-stack.ts` file:

```javascript
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyFirstStackStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }
}
```

This is where the stack for your CDK project is defined. In here you will place the code which describes the AWS resources you want to deploy as part of your stack.

Take a look at the `bin/my-first-stack.ts` file also:

```bash
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyFirstStackStack } from '../lib/my-first-stack-stack';

const app = new cdk.App();
new MyFirstStackStack(app, 'MyFirstStackStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
```

This is the entrypoint for your CDK project, and loads/executes the stack described in `lib/my-first-stack-stack.ts`.

## Creating an EC2 instance

Let's create an EC2 instance with CDK. Add the highlighted lines below to the stack in `lib/my-first-stack-stack.ts`:

```javascript title="lib/my-first-stack-stack.ts" {3,10-18}
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

export class MyFirstStackStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', {
      isDefault: true
    })

    const server = new ec2.Instance(this, 'MyInstance', {
      vpc,
      instanceType: new ec2.InstanceType('t3.nano'),
      machineImage: ec2.MachineImage.latestAmazonLinux()
    })

  }
}
```

### Setting the account and region for the stack

For this particular stack, we need to tell CDK which AWS account and region we are deploying to. Open up the `bin/my-first-stack.ts` file and uncomment the highlighted line below. This will tell CDK to deploy to the AWS account and region as currently configured in the AWS CLI.

```bash title="bin/my-first-stack.ts" {14}
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyFirstStackStack } from '../lib/my-first-stack-stack';

const app = new cdk.App();
new MyFirstStackStack(app, 'MyFirstStackStack', {
  /** If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
```

:::note Why do we need to do this?
The stack says to deploy an EC2 instance into the _default VPC_, but what VPC is this? To find out, CDK needs to perform a lookup to grab the details of the VPC - and to do this, it must know the AWS account and region in which to look in.
:::


Run `cdk deploy` to start the deployment of the stack. You will get something like below.

```
This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
┌───┬────────────────────────────────┬────────┬────────────────┬───────────────────────────────┬───────────┐
│   │ Resource                       │ Effect │ Action         │ Principal                     │ Condition │
├───┼────────────────────────────────┼────────┼────────────────┼───────────────────────────────┼───────────┤
│ + │ ${MyInstance/InstanceRole.Arn} │ Allow  │ sts:AssumeRole │ Service:ec2.${AWS::URLSuffix} │           │
└───┴────────────────────────────────┴────────┴────────────────┴───────────────────────────────┴───────────┘
Security Group Changes
┌───┬─────────────────────────────────────────────┬─────┬────────────┬─────────────────┐
│   │ Group                                       │ Dir │ Protocol   │ Peer            │
├───┼─────────────────────────────────────────────┼─────┼────────────┼─────────────────┤
│ + │ ${MyInstance/InstanceSecurityGroup.GroupId} │ Out │ Everything │ Everyone (IPv4) │
└───┴─────────────────────────────────────────────┴─────┴────────────┴─────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)
```

This is CDK letting you know what security-impacting changes the deploy will make, including IAM statement/policy and Security Group changes. 

Enter `y` to accept the changes and continue. This may take a few minutes, but once done you should see something like the below:

```bash
MyFirstStackStack: deploying...
MyFirstStackStack: creating CloudFormation changeset...


 ✅  MyFirstStackStack

Stack ARN:
arn:aws:cloudformation:eu-west-1:[account-id]:stack/MyFirstStackStack/a70c6020-709b-11eb-9b63-06c31b364fbd
```

## Making some changes

After launching the instance we realise that we actually wanted a `t3.small` instance type. Update the type of the instance like so below:


```javascript title="lib/my-first-stack-stack.ts" {16}
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

export class MyFirstStackStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', {
      isDefault: true
    })

    const server = new ec2.Instance(this, 'MyInstance', {
      vpc,
      instanceType: new ec2.InstanceType('t3.small'),
      machineImage: ec2.MachineImage.latestAmazonLinux()
    })

  }
}
```

We also want to know the public DNS name of the instance without having to go into the EC2 console and looking it up. Change/add the highlighted lines below to have the DNS name be outputted in the CLI after the stack is updated:

```javascript title="lib/my-first-stack-stack.ts" {1,20-23}
import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

export class MyFirstStackStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', {
      isDefault: true
    })

    const server = new ec2.Instance(this, 'MyInstance', {
      vpc,
      instanceType: new ec2.InstanceType('t3.small'),
      machineImage: ec2.MachineImage.latestAmazonLinux()
    })

    new CfnOutput(this, 'ServerDNSNameOutput', {
      value: server.instancePublicDnsName,
      exportName: 'ServerDNSName'
    });

  }
}
```

Run `cdk diff` to see what changes are going to be deployed:

```bash
Stack MyFirstStackStack
Resources
[~] AWS::EC2::Instance MyInstance MyInstanceA12EC128 may be replaced
 └─ [~] InstanceType (may cause replacement)
     ├─ [-] t3.nano
     └─ [+] t3.small

Outputs
[+] Output ServerDNSNameOutput ServerDNSNameOutput: {"Value":{"Fn::GetAtt":["MyInstanceA12EC128","PublicDnsName"]},"Export":{"Name":"ServerDNSName"}}
```

Run `cdk deploy` to start the update of the deployed stack. Once it has completed deploying, you will see that the DNS name of the instance (which is a `t3.small`) is printed out.

```
 ✅  MyFirstStackStack

Outputs:
MyFirstStackStack.ServerDNSNameOutput = ec2-18-203-102-161.eu-west-1.compute.amazonaws.com
```

## Destroying the stack

Once we're finished with the server and no longer need it, we want to terminate it so that we aren't being charged for it being up.

To **destroy every resource that the stack has created**, run `cdk destroy` from the CLI. You will be asked if you are sure you want to destroy the stack:

```bash
Are you sure you want to delete: MyFirstStackStack (y/n)?
```

Type `y` and press enter to confirm, and then wait whilst the stack is torn down. Once the process is finished, the EC2 instance will have been terminated.

Now that you have successfully created and destroyed your first stack, we are ready to begin working on our real application's stack.