---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /introduction
---

This is a guide that aims to introduce the [AWS CDK](https://aws.amazon.com/cdk/) by showing how it can be used to create and deploy the infrastructure required for a simple application which uses some components of a [service orientated architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture). As well as introducing CDK, it will also introduce the basic concepts and features of a few AWS services, including **VPCs**, **Elastic Container Service**, **AWS Cloud Map**, and **Route 53**.

:::caution
Following this guide will most-likely incur some cost in your AWS account.
:::

### What are we going to build?

At the end of this guide we will have built and deployed the infrastructure required for an online translation website, which (some would say labouredly) uses a simple service orientated architecture (SOA). 

The application will let users translate text they supply from the source and target languages of their choosing via a simple UI.

![A screenshot of the frontend UI](/img/frontend-screenshot.png)

### Who is this workshop for?

This workshop is for beginners to CDK/Infrastructure-as-Code who want to learn how to use it to set up a non-trivial infrastructure on AWS. No prior experience of AWS is required, but some familiarity will be helpful.

This workshop is also for people interested in learning about some of the basic principles/components of Service Orientated Architecture.


### A note on how to work through this workshop

The CDK code in this workshop is often quite terse, accomplishing a lot in a small amount of code. This is one of CDK's advantages over other IaC solutions, but can sometimes make it less obvious what is actually happening.

In each section I have tried to explain a bit about the services being used, what resources are actually being created, and how they work together. For this reason, I don't recommend that you simply rush through copy pasting the CDK code unless you have already been introduced to the services/topics within.


## Prerequisites

### AWS account & user

An AWS user with appropriate permissions and an access key & secret are needed to configure the AWS CLI.


### AWS CLI

Install the AWS CLI, which enables you to interact with with AWS from the CLI.

- [Installing on Linux/macOS/Unix](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
- [Installing on Windows](https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html#install-msi-on-windows)

Once installed, configure it with your access key & secret by running:

```bash
aws configure
```

### nodejs

AWS CDK version 2 relies on nodejs >= v10.13.0. See the [nodejs](https://nodejs.org/en/) website for instructions on installation.

### AWS CDK

We will be using the AWS CDK **version 2** for this workshop, which is currently in Developer Preview.

Install the CDK CLI tool by running:

```bash
npm install -g aws-cdk@2.0.0-rc.3
```

Check it is successfully installed by running:

```bash
cdk --version
```

Once you are ready, continue on to the next page where we will create a simple example CDK project to showcase some of the features of CDK.