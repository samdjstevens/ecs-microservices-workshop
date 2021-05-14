---
id: ecs
title: ECS
sidebar_label: ECS
slug: /ecs
---

## Using Elastic Container Service

We are going to use **Elastic Container Service** to run the docker containers of the application. With ECS, we will be using the **Fargate** capacity provider, meaning we won't have to provision, manage, or even think about EC2 servers to run the containers on - this is all handled and asbtracted away by AWS.

In **ECS**, a cluster is *"a logical grouping of tasks or services"*. The services which run in a cluster are ran on underlying infrastructure by eithe EC2 or Fargate. TODO more on this.

### Services, Tasks, Task Definitions, etc
[TODO]