---
id: servicediscovery
title: Discovering services
sidebar_label: Discovering services
slug: /discovering-services
---

## What is Service Discovery?

Service discovery is the process of automatically detecting instances of services on the network as they change over time without needing to store this information in configuration.

Without service discovery, the locations (I.P. addresses, DNS names) of services which an app depends on must be stored in configuration, and when these locations change (e.g. if more locations are added, or taken down) then this configuration would need to be updated and refreshed in the app.

With service discovery, these locations are automatically fetched and refreshed.

For a more detailed explanation of service discovery, [click here](https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture/).

## Service Discovery with AWS Cloud Map

[AWS Cloud Map](https://aws.amazon.com/cloud-map/) is the AWS offering for Service Discovery in the cloud. Cloud Map enables you to create "pools" for application resources, which can be servers, containers, databases, queues, S3 buckets, and more. Cloud Map will provide health checks for resources, and can be queried for healthy/active resources.

AWS Cloud Map has deep integrations with other AWS services which make it particulary helpful. It integrates with Route53 to automatically update A and SRV records in a hosted zone that can be either public or private (internally resolvable only), and it integrates with ECS to automatically add/remove instances of containers when as they are instantiated and terminated.

## Our requirements

We want consumers of the translate-api we deployed previously on ECS to be able to discover the URLs of healthy instances of the containers without needing to know the addresses beforehand, and for the locations to automatically update as instances come up and down.

We will use DNS based service discovery on a private hosted zone (only resolvable from within the VPC) so that consumers can simply use a URL like http://translate-api.local, which will respond with the location of a healthy instance.


## Integrating Cloud Map with ECS using CDK


Change the below highlighted lines to the CDK stack:

```javascript title="lib/translatr-cdk-stack.ts" {3,19-23,34-36}
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_iam as iam, aws_servicediscovery as servicediscovery } from 'aws-cdk-lib';

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
        defaultCloudMapNamespace: {
            name: 'local',
            type: servicediscovery.NamespaceType.DNS_PRIVATE,
            vpc
        }
    })

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

  }
}
```

Run `cdk deploy` to apply the changes.

The first change says that we want AWS Cloud Map to create a namespace called `local` - namespace is basically a group of services - and to associate it with the ECS cluster.

We specify that this namespace should make it's services discoverable via private DNS, which tells AWS Cloud Map to create a private hosted zone in Route53 for the namespace, and to associate it with the VPC specified. When services are added to this namespace, Cloud Map will create A records in the hosted zone mapping to the resources.

The second change instructs ECS to create an AWS Cloud Map service called `translate-api` within the `local` namespace, and to associate the ECS service with it, which means AWS with automtically manage the adding/removing of instances to the service as it manages the ECS tasks.

All this results in an A record for `translate-api.local` being created in the private R53 Hosted Zone, which poins to the current healthy instances of the translate-api service.

We can test this once the latest change has been rolled out by connecting to the **bastion host** again, and running the following commands:

```bash
$ dig +short translate-api.local
10.0.198.67
10.0.142.110
10.0.251.115

$ curl http://translate-api.local/actuator/health
{"status":"UP"}
```