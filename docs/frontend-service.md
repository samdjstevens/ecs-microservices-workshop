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

## Adding the service with CDK


```javascript title="lib/translatr-cdk-stack.ts" {1,3,22-32}
import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_iam as iam, aws_servicediscovery as servicediscovery, aws_ecs_patterns as ecs_patterns } from 'aws-cdk-lib';

export class TranslatrCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    ...

    const service = new ecs.FargateService(this, 'TransateApiService', {
        cluster,
        serviceName: 'translate-api',
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

- Talk about how we're using a high level construct `ApplicationLoadBalancedFargateService` and what it does for us.
- Talk about the environment to make the app configurable.
- No need to configure security groups, it just works.

## Testing the service

[TODO]