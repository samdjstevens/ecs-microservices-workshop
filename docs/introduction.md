---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /introduction
---

This is a guide that aims to introduce the AWS CDK by showing how it can be used to create and deploy the required infrastructure for a simple microservice based application. As well as introducing CDK, it will also introduce the basic concepts and features of a few AWS services, including **VPCs**, **Elastic Container Service**, **AWS Cloud Map**, and **Route 53**.

**Warning**: Following this guide will most-likely incur some cost in your AWS account.

### What are we going to build?

At the end of this workshop we will have built and deployed the infrastructure and code required for an online translation webapp, which (some would say labouredly) uses a simple service orientated architecture. 

The application will allow users to translate text they supply from the source and target languages of their choosing.

### Who is this workshop for?

This workshop is for beginners to CDK/Infrastructure-as-Code who want to learn how to use it to set up a complex infratructure on AWS. No prior experience of AWS is required, but some familiarilty will be helpful.

This workshop is also for people interested in learning about some of the basic principles of Service Orientated Architecture (SOA).


### A note on how to work through this workshop

The CDK code in this workshop is often quite terse - and sometimes mysterious - accomplishing a lot in a small amount of code. This is one of CDK's advantages over other IaC solutions, but can sometimes make it less obvious what is actually happening.

In each section I have tried to explain a bit about the services being used, what resources are actually being created, and how they work together. For this reason, I don't recommend that you simply rush through copy pasting the CDK code unless you have already been introduced to the services/topics within.

Speaking of copy and pasting the code examples, I don't recommend that you do this either. If you use an editor like VS Code, there are great CDK plugins which make writing CDK very easy, with features such as autocomplete and documentation showing, and will often help you find the property/method you are after without Googling.


## Pre-requisites

### AWS account & user

An AWS user with appropriate permissions and an access key & secret are needed to configure the AWS CLI.


### AWS CLI

Install the AWS CLI, which enables you to interact with with AWS from the CLI.

- [Installing on Linux/macOS/Unix](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
- [Installing on Windows](https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html#install-msi-on-windows)


### nodejs

AWS CDK relies on nodejs >= v10.3.0. See the [nodejs](https://nodejs.org/en/) website for instructions on installation.

### AWS CDK

Install the CDK CLI tool by running:

```bash
npm install -g aws-cdk
```

Check it is successfully installed by running:

```bash
cdk --version
```

## Setting up the environment

Make sure the AWS CLI is configured by running:

```bash
aws configure
```

Once you're all set up, continue on to My First Stack, where we will build our very first CDK stack.