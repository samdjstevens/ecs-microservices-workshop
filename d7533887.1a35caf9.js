(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{83:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return o})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(7),i=(n(0),n(88)),s={id:"frontend-service",title:"Adding the frontend service",sidebar_label:"Adding the frontend service",slug:"/frontend-service"},c={unversionedId:"frontend-service",id:"frontend-service",isDocsHomePage:!1,title:"Adding the frontend service",description:"How it works",source:"@site/docs/frontend-service.md",slug:"/frontend-service",permalink:"/ecs-microservices-workshop/frontend-service",editUrl:"https://github.com/samdjstevens/ecs-microservices-workshop/edit/master/docs/frontend-service.md",version:"current",sidebar_label:"Adding the frontend service",sidebar:"someSidebar",previous:{title:"Discovering services",permalink:"/ecs-microservices-workshop/discovering-services"},next:{title:"Writing constructs",permalink:"/ecs-microservices-workshop/writing-constructs"}},o=[{value:"How it works",id:"how-it-works",children:[]},{value:"Source Code",id:"source-code",children:[]},{value:"Our Requirements",id:"our-requirements",children:[]},{value:"Adding the service with CDK",id:"adding-the-service-with-cdk",children:[]},{value:"Testing the service",id:"testing-the-service",children:[]}],l={toc:o};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h3",{id:"how-it-works"},"How it works"),Object(i.b)("p",null,"The frontend service is a simple ",Object(i.b)("a",{parentName:"p",href:"https://expressjs.com/"},"Express")," based application written in nodejs, that displays a UI to the user to translate text. The translation requests are sent off to the translation-api service to be handled before the result is displayed to the user."),Object(i.b)("h3",{id:"source-code"},"Source Code"),Object(i.b)("p",null,Object(i.b)("a",{parentName:"p",href:"https://github.com/samdjstevens/ecs-microservices-frontend"},"Click here")," to view the source code of the service on GitHub."),Object(i.b)("h3",{id:"our-requirements"},"Our Requirements"),Object(i.b)("p",null,"Unlike the backend translate-api service, we want this service to be ",Object(i.b)("strong",{parentName:"p"},"publically available")," so that users can reach and interact with the UI via the browser. This means that we will need an ",Object(i.b)("a",{parentName:"p",href:"https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html"},"Application Load Balancer")," in our public subnets which will route traffic to the instances of our service. We also need to make sure that the security groups are created and applied to ensure traffic from the internet to the load balancer is allowed, as well as traffic from the load balancer to the service instances."),Object(i.b)("h3",{id:"adding-the-service-with-cdk"},"Adding the service with CDK"),Object(i.b)("p",null,"We can create all the required pieces needed to deploy this service by making use of the ",Object(i.b)("inlineCode",{parentName:"p"},"ApplicationLoadBalancedFargateService")," construct from the ",Object(i.b)("a",{parentName:"p",href:"https://docs.aws.amazon.com/cdk/api/latest/docs/aws-ecs-patterns-readme.html"},"ecs-patterns")," module."),Object(i.b)("p",null,"Add/change the highlighted lines below in the stack:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="lib/translatr-cdk-stack.ts" {1,3,21-36}',title:'"lib/translatr-cdk-stack.ts"',"{1,3,21-36}":!0},"import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';\nimport { Construct } from 'constructs';\nimport { aws_ec2 as ec2, aws_ecs as ecs, aws_iam as iam, aws_servicediscovery as servicediscovery, aws_ecs_patterns as ecs_patterns } from 'aws-cdk-lib';\n\nexport class TranslatrCdkStack extends Stack {\n  constructor(scope: Construct, id: string, props?: StackProps) {\n    super(scope, id, props);\n\n    ...\n\n    const service = new ecs.FargateService(this, 'TransateApiService', {\n        cluster,\n        taskDefinition: translateApiTaskDefinition,\n        desiredCount: 3,\n        securityGroups: [appTaskDefinitionSecurityGroup],\n        cloudMapOptions: {\n            name: 'translate-api'\n        }\n    })\n\n    let translateApiUrl = \"http://\" + service.cloudMapService!.serviceName + \".\" + service.cloudMapService!.namespace.namespaceName;\n\n    const frontendService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'PublicService', {\n        cluster,\n        taskImageOptions: {\n            image: ecs.ContainerImage.fromRegistry('public.ecr.aws/f0u6x9s9/ecs-microservices-frontend'),\n            environment: {\n                \"TRANSLATE_API_URL\": translateApiUrl,\n            }\n        }\n    })\n\n    new CfnOutput(this, 'FrontendPublicUrl', {\n        value: 'http://' + frontendService.loadBalancer.loadBalancerDnsName,\n        exportName: 'FrontendPublicUrl'\n    });\n\n  }\n}\n")),Object(i.b)("p",null,"In the first added line we grab the URL of the translation api service by reading from the service's Cloud Map properties. "),Object(i.b)("p",null,"Next, we create an ",Object(i.b)("inlineCode",{parentName:"p"},"ApplicationLoadBalancedFargateService")," instance, which is a high level construct from the ",Object(i.b)("a",{parentName:"p",href:"https://docs.aws.amazon.com/cdk/api/latest/docs/aws-ecs-patterns-readme.html"},"ecs-patterns module"),". This module provides common architectural patterns which can be used to quickly define infrastructure with several sub components."),Object(i.b)("p",null,"Using the ",Object(i.b)("inlineCode",{parentName:"p"},"ApplicationLoadBalancedFargateService")," construct will create everything needed for a publially available, load balanced service, including the task definition, the service, the load balancer, the required security groups, and more."),Object(i.b)("p",null,"When we specify the task image options, we say that the environment should contain a variable called ",Object(i.b)("inlineCode",{parentName:"p"},"TRANSLATE_API_URL")," which is set to the URL of the translation api service. In the ",Object(i.b)("a",{parentName:"p",href:"https://github.com/samdjstevens/ecs-microservices-frontend/blob/4d2d99f10eb1c998f1eac251792620e4fda3a007/app.js#L10"},"source code")," of the frontend service app, we can see that it reads this variable when making translation requests."),Object(i.b)("p",null,"Finally, we add a ",Object(i.b)("a",{parentName:"p",href:"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html"},"CloudFormation output")," for the URL of the public load balancer, so we can easily grab the URL of our application."),Object(i.b)("h2",{id:"testing-the-service"},"Testing the service"),Object(i.b)("p",null,"In the outputs section for the stack, you should see something like:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"TranslatrCdkStack.FrontendPublicUrl = http://Trans-Publi-1NWJFGH1WBZF1-1755592122.eu-west-1.elb.amazonaws.com\n")),Object(i.b)("p",null,"If you navigate to this URL in your browser, you should see the UI for our translation application, which os being served up by the frontend service."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"\ud83c\udf89 Our application is up and running! \ud83c\udf89")),Object(i.b)("p",null,"Give it a go by selecting a source and target language, and enter some text to translate."),Object(i.b)("p",null,"Our application is now deployed and we are technically finished. However, the CDK code we have written isn't very re-usable/portable across projects at the minute. In the next section we will look at how we can write CDK which we can re-use across projects."))}p.isMDXComponent=!0},88:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},h=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),d=p(n),h=r,b=d["".concat(s,".").concat(h)]||d[h]||u[h]||i;return n?a.a.createElement(b,c(c({ref:t},l),{},{components:n})):a.a.createElement(b,c({ref:t},l))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=h;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:r,s[1]=c;for(var l=2;l<i;l++)s[l]=n[l];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"}}]);