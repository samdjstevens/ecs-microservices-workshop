(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{74:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return o})),n.d(t,"default",(function(){return p}));var a=n(3),c=n(7),r=(n(0),n(85)),i={id:"first-stack",title:"My First Stack",sidebar_label:"My First Stack",slug:"/my-first-stack"},s={unversionedId:"first-stack",id:"first-stack",isDocsHomePage:!1,title:"My First Stack",description:"Let's dive right in and create our first CDK stack. In the following steps, we will use CDK to provision an EC2 instance, make some changes to it, and retrieve some information about it, all as Infrastructure-as-Code.",source:"@site/docs/first-stack.md",slug:"/my-first-stack",permalink:"/ecs-microservices-workshop/my-first-stack",editUrl:"https://github.com/samdjstevens/ecs-microservices-workshop/edit/master/docs/first-stack.md",version:"current",sidebar_label:"My First Stack",sidebar:"someSidebar",previous:{title:"Introduction",permalink:"/ecs-microservices-workshop/introduction"},next:{title:"Translatr",permalink:"/ecs-microservices-workshop/project-description"}},o=[{value:"Creating the stack",id:"creating-the-stack",children:[{value:"Exploring the project",id:"exploring-the-project",children:[]}]},{value:"Creating an EC2 instance",id:"creating-an-ec2-instance",children:[{value:"Setting the account and region for the stack",id:"setting-the-account-and-region-for-the-stack",children:[]}]},{value:"Making some changes",id:"making-some-changes",children:[]},{value:"Destroying the stack",id:"destroying-the-stack",children:[]}],l={toc:o};function p(e){var t=e.components,n=Object(c.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Let's dive right in and create our first CDK stack. In the following steps, we will use CDK to provision an EC2 instance, make some changes to it, and retrieve some information about it, all as Infrastructure-as-Code."),Object(r.b)("h2",{id:"creating-the-stack"},"Creating the stack"),Object(r.b)("p",null,"To start creating your first CDK stack, create a new directory and move inside it by running the following command in the CLI:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"mkdir my-first-stack && cd my-first-stack\n")),Object(r.b)("p",null,"Next, initialise the CDK project with the following command:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"cdk init app --language typescript\n")),Object(r.b)("p",null,"In a new terminal window, inside the same directory, run:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"npm run watch\n")),Object(r.b)("p",null,"This will start watching the source for any changes and re-compile:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"[15:51:00] Starting compilation in watch mode...\n\n[15:51:06] Found 0 errors. Watching for file changes.\n")),Object(r.b)("p",null,"Your workspace is now ready to start exploring your stack."),Object(r.b)("h3",{id:"exploring-the-project"},"Exploring the project"),Object(r.b)("p",null,"[TODO]"),Object(r.b)("h2",{id:"creating-an-ec2-instance"},"Creating an EC2 instance"),Object(r.b)("p",null,"Let's create an EC2 instance with CDK. First we need to add the ",Object(r.b)("inlineCode",{parentName:"p"},"@aws-cdk/aws-ec2")," dependency to our stack to bring in all the CDK constructs associated with EC2."),Object(r.b)("p",null,"Stop the ",Object(r.b)("inlineCode",{parentName:"p"},"npm run watch")," command and run the following commands: "),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"npm install @aws-cdk/aws-ec2@1.49.1 --save\nnpm run watch\n")),Object(r.b)("p",null,"Now add the highlighted lines below to the stack in ",Object(r.b)("inlineCode",{parentName:"p"},"lib/my-first-stack-stack.ts"),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="lib/my-first-stack-stack.ts" {2,9-17}',title:'"lib/my-first-stack-stack.ts"',"{2,9-17}":!0},"import * as cdk from '@aws-cdk/core';\nimport * as ec2 from \"@aws-cdk/aws-ec2\";\n\nexport class MyFirstStackStack extends cdk.Stack {\n  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {\n    super(scope, id, props);\n\n    // The code that defines your stack goes here\n    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', {\n      isDefault: true\n    })\n\n    const server = new ec2.Instance(this, 'MyInstance', {\n      vpc,\n      instanceType: new ec2.InstanceType('t3.nano'),\n      machineImage: ec2.MachineImage.latestAmazonLinux()\n    })\n\n  }\n}\n")),Object(r.b)("h3",{id:"setting-the-account-and-region-for-the-stack"},"Setting the account and region for the stack"),Object(r.b)("p",null,"For this particular stack, we need to tell CDK which AWS account and region we are deploying to. Open up the ",Object(r.b)("inlineCode",{parentName:"p"},"bin/my-first-stack.ts")," file and make the changes highlighted below, replacing the placeholders with your AWS account ID and region which you wish to deploy to."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash",metastring:'title="bin/my-first-stack.ts" {7-8}',title:'"bin/my-first-stack.ts"',"{7-8}":!0},"#!/usr/bin/env node\nimport 'source-map-support/register';\nimport * as cdk from '@aws-cdk/core';\nimport { MyFirstStackStack } from '../lib/my-first-stack-stack';\n\nconst app = new cdk.App();\nconst env = { account: '[YOUR-ACCOUNT-ID-HERE]', region: '[YOUR-PREFERRED-REGION-HERE]' };\nnew MyFirstStackStack(app, 'MyFirstStackStack', { env });\n")),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Why do we need to do this?")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"The stack says to deploy an EC2 instance into the ",Object(r.b)("em",{parentName:"p"},"default VPC"),", but what VPC is this? To find out, CDK needs to perform a lookup to grab the details of the VPC - and to do this, it must know the AWS account and region in which to look in."))),Object(r.b)("p",null,"Run ",Object(r.b)("inlineCode",{parentName:"p"},"cdk deploy")," to start the deployment of the stack. You will get something like below."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).\nPlease confirm you intend to make the following modifications:\n\nIAM Statement Changes\n\u250c\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502   \u2502 Resource                       \u2502 Effect \u2502 Action         \u2502 Principal                     \u2502 Condition \u2502\n\u251c\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 + \u2502 ${MyInstance/InstanceRole.Arn} \u2502 Allow  \u2502 sts:AssumeRole \u2502 Service:ec2.${AWS::URLSuffix} \u2502           \u2502\n\u2514\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\nSecurity Group Changes\n\u250c\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n\u2502   \u2502 Group                                       \u2502 Dir \u2502 Protocol   \u2502 Peer            \u2502\n\u251c\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\n\u2502 + \u2502 ${MyInstance/InstanceSecurityGroup.GroupId} \u2502 Out \u2502 Everything \u2502 Everyone (IPv4) \u2502\n\u2514\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)\n")),Object(r.b)("p",null,"Enter ",Object(r.b)("inlineCode",{parentName:"p"},"y")," to accept the changes and continue. This may take a few minutes, but once done you should see something like the below:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"MyFirstStackStack: deploying...\nMyFirstStackStack: creating CloudFormation changeset...\n\n\n \u2705  MyFirstStackStack\n\nStack ARN:\narn:aws:cloudformation:eu-west-1:[account-id]:stack/MyFirstStackStack/a70c6020-709b-11eb-9b63-06c31b364fbd\n")),Object(r.b)("h2",{id:"making-some-changes"},"Making some changes"),Object(r.b)("p",null,"After launching the instance we realise that we actually wanted a ",Object(r.b)("inlineCode",{parentName:"p"},"t3.small")," instance type. Update the type of the instance like so below:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="lib/my-first-stack-stack.ts" {3}',title:'"lib/my-first-stack-stack.ts"',"{3}":!0},"const server = new ec2.Instance(this, 'MyInstance', {\n  vpc,\n  instanceType: new ec2.InstanceType('t3.small'),\n  machineImage: ec2.MachineImage.latestAmazonLinux()\n})\n")),Object(r.b)("p",null,"We also want to know the public DNS name of the instance without having to go into the EC2 console and looking it up. Add the highlighted lines below to have the DNS name be outputted in the CLI after the stack is updated:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="lib/my-first-stack-stack.ts" {7-10}',title:'"lib/my-first-stack-stack.ts"',"{7-10}":!0},"const server = new ec2.Instance(this, 'MyInstance', {\n  vpc,\n  instanceType: new ec2.InstanceType('t3.small'),\n  machineImage: ec2.MachineImage.latestAmazonLinux()\n})\n\nnew cdk.CfnOutput(this, 'ServerDNSNameOutput', {\n  value: server.instancePublicDnsName,\n  exportName: 'ServerDNSName'\n});\n")),Object(r.b)("p",null,"Run ",Object(r.b)("inlineCode",{parentName:"p"},"cdk deploy")," to start the update of the deployed stack. Once it has completed deploying, you will see that the DNS name of the instance (which is a ",Object(r.b)("inlineCode",{parentName:"p"},"t3.small"),") is printed out."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"}," \u2705  MyFirstStackStack\n\nOutputs:\nMyFirstStackStack.ServerDNSNameOutput = ec2-18-203-102-161.eu-west-1.compute.amazonaws.com\n")),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Why was the first instance deleted and a new one created?")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"You cannot change the instance type of an EC2 instance once it has been launched - to resize it you must launch another instance. CDK is aware of this and takes care of removing the old instance and creating the new one for you."))),Object(r.b)("h2",{id:"destroying-the-stack"},"Destroying the stack"),Object(r.b)("p",null,"Once we're finished with the server and no longer need it, we want to terminate it so that we aren't being charged for it being up."),Object(r.b)("p",null,"To ",Object(r.b)("strong",{parentName:"p"},"destroy every resource that the stack has created"),", run ",Object(r.b)("inlineCode",{parentName:"p"},"cdk destroy")," from the CLI. You will be asked if you are sure you want to destroy the stack:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"Are you sure you want to delete: MyFirstStackStack (y/n)?\n")),Object(r.b)("p",null,"Type ",Object(r.b)("inlineCode",{parentName:"p"},"y")," and press enter to confirm, and then wait whilst the stack is torn down. Once the process is finished, the EC2 instance will have been terminated."),Object(r.b)("p",null,"Now that you have successfully created and destroyed your first stack, we are ready to begin working on our ECS Microservices Stack."))}p.isMDXComponent=!0},85:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var a=n(0),c=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,c=function(e,t){if(null==e)return{};var n,a,c={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var l=c.a.createContext({}),p=function(e){var t=c.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return c.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return c.a.createElement(c.a.Fragment,{},t)}},b=c.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),d=p(n),b=a,m=d["".concat(i,".").concat(b)]||d[b]||u[b]||r;return n?c.a.createElement(m,s(s({ref:t},l),{},{components:n})):c.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=b;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<r;l++)i[l]=n[l];return c.a.createElement.apply(null,i)}return c.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);