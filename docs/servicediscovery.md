---
id: servicediscovery
title: Discovering services
sidebar_label: Discovering services
slug: /discovering-services
---

## What is Service Discovery?

Service discovery is the process of automatically detecting devices/services on the network as they change over time without needing to store this information in configuration.

Without service discovery, the locations (I.P. addresses, DNS names) of services which an app depends on must be stored in configuration, and when these locations change (e.g. if more locations are added, or taken down) then this configuration woudl need to be updated and refreshed in the app.

With service discovery, these locations are automatically fetched and refreshed.

For a more detailed explanation of service discovery, [click here](https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture/).

## Service Discovery with AWS Cloud Map

[AWS Cloud Map](https://aws.amazon.com/cloud-map/) is the AWS offering for Service Discovery in the cloud. Cloud Map enables you to create "pools" for application resources, which can be servers, containers, databases, queues, S3 buckets, and more. Cloud Map will provide health checks for resources, and can be queried for healthy/active resources.

AWS Cloud Map has deep integrations with other AWS services which make it particulary helpful. It integrates with Route53 to automatically update A and SRV records in a hosted zone that can be either public or private (internally resolvable only), and it integrates with ECS to automatically add/remove instances of containers when as they are instantiated and terminated.

## Our requirements

- What do we want?
    - create an "app" in cloud map
    - have ecs tasks be added/removed from it
    - hve route53 hosted zone for it thats internally resolvabele from the pods.

We want consumers of the translate-api we deployed previously on ECS to be able to discover the URLs of healthy instances of the containers without needing to know the addresses beforehand, and for the locations to automatically update as instances come up and down.

We will use DNS based service discovery on a private hosted zone (only resolvable from within the VPC) so that consumers can simply use a URL like http://translate-api.local, which will respond with one of/all (todo: check) the locations of the instances.

To do this, we need to create an CM app, tell ECS to update it on up/down, and tell SM to integrate with Route53.

## Integrating Cloud Map with ECS using CDK

Again, we must add another CDK dependency to our stack first, this time it's the `@aws-cdk/aws-servicediscovery` package. Stop the `npm run watch` command and run the following commands: 

```bash
npm install @aws-cdk/aws-servicediscovery --save
npm run watch
```

Next, add the highlighted lines to the CDK stack.

```javascript title="lib/ecs-microservices-stack.ts" {6,11-15,22-24}
import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecr from "@aws-cdk/aws-ecr";
import * as iam from "@aws-cdk/aws-iam";
import * as servicediscovery from "@aws-cdk/aws-servicediscovery";
...
const cluster = new ecs.Cluster(this, 'Cluster', {
    vpc,
    clusterName: 'ECS-Microservices-Workshop',
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
    taskDefinition: taskDefinition,
    cloudMapOptions: {
        name: 'translate-api'
    },
    securityGroups: [sg],
    desiredCount: 3
})
```

The first addition says that we want AWS Cloud Map to create a namespace called `local` - namespace is basically a group of services - and to associate it with the ECS cluster.

We specify that this namespace should make it's services discoverable via private DNS, which tells AWS Cloud Map to create a private hosted zone in Route53 for the namespace, and to associate it with the VPC specified. When services are added to this namespace, Cloud Map will create A records in the hosted zone mapping to the resources.

The second change instructs ECS to create an AWS Cloud Map service called `translate-api` within the `local` namespace, and to associate the ECS service with it, which means AWS with automtically manage the adding/removing of instances to the service as it manages the ECS tasks.

Because the namespace is set TODO, a private Route5 Hosted Zone is created for `translate-api.local`, which will return the addresses of the healthy translate-api services when queried from within the VPC.

We can test this once the latest change has been rolled out by logging into the **bastion host** using Session Manager, and running the following commands:
```bash
$ dig +short translate-api.local
10.0.198.67
10.0.142.110
10.0.251.115

$ curl http://translate-api.local/actuator/health
{"status":"UP"}
```