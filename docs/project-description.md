---
id: project-description
title: Translatr
sidebar_label: Translatr app
slug: /project-description
---

[TODO]
- What the app does
- Architecture diagram of finished solution

![Architecture diagram of what we will build](/img/architecture-diagram.png)

## Creating the CDK project

Begin by creating a new CDK project for the application:

```bash
mkdir translatr-cdk && cd translatr-cdk
```

Initialise the CDK project with the following command:

```bash
cdk init app --language typescript
```

In a new terminal window, inside the same directory, run:

```bash
npm run watch
```

Continue onto the next section to see how we can create the VPC that the application infrastructure will be deployed into.