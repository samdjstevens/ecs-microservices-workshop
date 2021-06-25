---
id: ecs
title: Elastic Container Service
sidebar_label: Elastic Container Service
slug: /elastic-container-service
---


[**Elastic Container Service (ECS)**](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html) is one of the ways that you can run Docker containers on AWS. ECS is a container orchestration service that is similar to Kubernetes, providing lots of the same functionality, but with deep integration with many other AWS services such as Cloudwatch, Cloud Map, EC2, and VPC networking.



## Clusters, Task Definitions, Tasks, Services...

ECS has a few fundamental concepts that must be understood to effectively use it. I'll briefly outline the most important ones below to give enough information to get going.

### What is a Cluster?

In ECS, a [**cluster**](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html) is *"a logical grouping of tasks or services"*. Capacity (i.e. memory, CPU, disk space) for running containers on the cluster can be provided from various sources, including EC2 instances, on-premise servers, or even on-demand "serverless" capacity provided by **AWS Fargate**. We will be using Fargate in this workshop as it means we won't have to provision, manage, or even think about EC2 servers to run the containers on - this is all handled and abstracted away by AWS.


### What is a Task Definition?

A **[task definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html)** is a JSON document that acts as a template of how ECS should run one or more **containers**. It tells ECS what container images to run, how much memory and CPU they are to be given, which networking mode to use, what ports to open, and lots of other things around running containers.

Below is an example of a simple task definition that runs an NGINX container on Fargate:

```json
{
    "family": "webserver",
    "containerDefinitions": [
        {
            "name": "web",
            "image": "nginx",
            "memory": "100",
            "cpu": "99"
        }
    ],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "networkMode": "awsvpc",
    "memory": "512",
    "cpu": "256"
}
```

### What is a Task?

A **task** is simply a running "instance" of a **task definition**. A task definition defines one or more containers and how they should be ran, and a task is the running instances of those containers.

### What is a Service?

A [**service**](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html) in ECS is the definiton of running a specified number of instances of **tasks**, which are defined by a **task definition**. The ECS service scheduler maintains the desired number of tasks for you, meaning that if a task fails or stops, another one is brought up in it's place.



Now that we have the basics of ECS down, we can begin utilizing ECS by creating the cluster on which our containers will run.