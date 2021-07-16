---
id: frontend-service
title: Adding the frontend service
sidebar_label: Adding the frontend service
slug: /frontend-service
---

### How it works

The frontend service is a simple [Express](https://expressjs.com/) based application written in nodejs, that displays a UI to the user to translate text. The translation requests are sent off to the translation-api service to be handled before the result is displayed to the user.


### Source Code

[Click here](https://github.com/samdjstevens/ecs-microservices-frontend) to view the source code of the service on GitHub.

### Our Requirements

Unlike the backend translate-api service, we want this service to be **publically available** so that users can reach and interact with the UI via the browser. This means that we will need an [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) in our public subnets which will route traffic to the instances of our service. We also need to make sure that the security groups are created and applied to ensure traffic from the internet to the load balancer is allowed, as well as traffic from the load balancer to the service instances.


### Adding the service with CDK

We can create all the required pieces needed to deploy this service by making use of the `ApplicationLoadBalancedFargateService` construct from the [ecs-patterns](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-ecs-patterns-readme.html) module.

Add/change the highlighted lines below in the stack:

```javascript title="lib/translatr-cdk-stack.ts" {1,3,21-36}
import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_iam as iam, aws_servicediscovery as servicediscovery, aws_ecs_patterns as ecs_patterns } from 'aws-cdk-lib';

export class TranslatrCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    ...

    const service = new ecs.FargateService(this, 'TransateApiService', {
        cluster,
        taskDefinition: translateApiTaskDefinition,
        desiredCount: 3,
        securityGroups: [appTaskDefinitionSecurityGroup],
        cloudMapOptions: {
            name: 'translate-api'
        }
    })

    let translateApiUrl = "http://" + service.cloudMapService!.serviceName + "." + service.cloudMapService!.namespace.namespaceName;

    const frontendService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'PublicService', {
        cluster,
        taskImageOptions: {
            image: ecs.ContainerImage.fromRegistry('public.ecr.aws/f0u6x9s9/ecs-microservices-frontend'),
            environment: {
                "TRANSLATE_API_URL": translateApiUrl,
            }
        }
    })

    new CfnOutput(this, 'FrontendPublicUrl', {
        value: 'http://' + frontendService.loadBalancer.loadBalancerDnsName,
        exportName: 'FrontendPublicUrl'
    });

  }
}
```

In the first added line we grab the URL of the translation api service by reading from the service's Cloud Map properties. 

Next, we create an `ApplicationLoadBalancedFargateService` instance, which is a high level construct from the [ecs-patterns module](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-ecs-patterns-readme.html). This module provides common architectural patterns which can be used to quickly define infrastructure with several sub components.

Using the `ApplicationLoadBalancedFargateService` construct will create everything needed for a publially available, load balanced service, including the task definition, the service, the load balancer, the required security groups, and more.

When we specify the task image options, we say that the environment should contain a variable called `TRANSLATE_API_URL` which is set to the URL of the translation api service. In the [source code](https://github.com/samdjstevens/ecs-microservices-frontend/blob/4d2d99f10eb1c998f1eac251792620e4fda3a007/app.js#L10) of the frontend service app, we can see that it reads this variable when making translation requests.

Finally, we add a [CloudFormation output](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html) for the URL of the public load balancer, so we can easily grab the URL of our application.


## Testing the service

In the outputs section for the stack, you should see something like:

```
TranslatrCdkStack.FrontendPublicUrl = http://Trans-Publi-1NWJFGH1WBZF1-1755592122.eu-west-1.elb.amazonaws.com
```

If you navigate to this URL in your browser, you should see the UI for our translation application, which os being served up by the frontend service.

**🎉 Our application is up and running! 🎉**

Give it a go by selecting a source and target language, and enter some text to translate.

Our application is now deployed and we are technically finished. However, the CDK code we have written isn't very re-usable/portable across projects at the minute. In the next section we will look at how we can write CDK which we can re-use across projects.