(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{80:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return s})),a.d(t,"toc",(function(){return o})),a.d(t,"default",(function(){return l}));var n=a(3),r=(a(0),a(87));const i={id:"servicediscovery",title:"Discovering services",sidebar_label:"Discovering services",slug:"/discovering-services"},s={unversionedId:"servicediscovery",id:"servicediscovery",isDocsHomePage:!1,title:"Discovering services",description:"What is Service Discovery?",source:"@site/docs/servicediscovery.md",slug:"/discovering-services",permalink:"/ecs-microservices-workshop/discovering-services",editUrl:"https://github.com/samdjstevens/ecs-microservices-workshop/edit/master/docs/servicediscovery.md",version:"current",sidebar_label:"Discovering services",sidebar:"someSidebar",previous:{title:"Adding a Service",permalink:"/ecs-microservices-workshop/adding-a-service"},next:{title:"Frontend service",permalink:"/ecs-microservices-workshop/frontend-service"}},o=[{value:"What is Service Discovery?",id:"what-is-service-discovery",children:[]},{value:"Service Discovery with AWS Cloud Map",id:"service-discovery-with-aws-cloud-map",children:[]},{value:"Our requirements",id:"our-requirements",children:[]},{value:"Integrating Cloud Map with ECS using CDK",id:"integrating-cloud-map-with-ecs-using-cdk",children:[]}],c={toc:o};function l({components:e,...t}){return Object(r.b)("wrapper",Object(n.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"what-is-service-discovery"},"What is Service Discovery?"),Object(r.b)("p",null,"Service discovery is the process of automatically detecting devices/services on the network as they change over time without needing to store this information in configuration."),Object(r.b)("p",null,"Without service discovery, the locations (I.P. addresses, DNS names) of services which an app depends on must be stored in configuration, and when these locations change (e.g. if more locations are added, or taken down) then this configuration woudl need to be updated and refreshed in the app."),Object(r.b)("p",null,"With service discovery, these locations are automatically fetched and refreshed."),Object(r.b)("p",null,"For a more detailed explanation of service discovery, ",Object(r.b)("a",{parentName:"p",href:"https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture/"},"click here"),"."),Object(r.b)("h2",{id:"service-discovery-with-aws-cloud-map"},"Service Discovery with AWS Cloud Map"),Object(r.b)("p",null,Object(r.b)("a",{parentName:"p",href:"https://aws.amazon.com/cloud-map/"},"AWS Cloud Map"),' is the AWS offering for Service Discovery in the cloud. Cloud Map enables you to create "pools" for application resources, which can be servers, containers, databases, queues, S3 buckets, and more. Cloud Map will provide health checks for resources, and can be queried for healthy/active resources.'),Object(r.b)("p",null,"AWS Cloud Map has deep integrations with other AWS services which make it particulary helpful. It integrates with Route53 to automatically update A and SRV records in a hosted zone that can be either public or private (internally resolvable only), and it integrates with ECS to automatically add/remove instances of containers when as they are instantiated and terminated."),Object(r.b)("h2",{id:"our-requirements"},"Our requirements"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"What do we want?",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},'create an "app" in cloud map'),Object(r.b)("li",{parentName:"ul"},"have ecs tasks be added/removed from it"),Object(r.b)("li",{parentName:"ul"},"hve route53 hosted zone for it thats internally resolvabele from the pods.")))),Object(r.b)("p",null,"We want consumers of the translate-api we deployed previously on ECS to be able to discover the URLs of healthy instances of the containers without needing to know the addresses beforehand, and for the locations to automatically update as instances come up and down."),Object(r.b)("p",null,"We will use DNS based service discovery on a private hosted zone (only resolvable from within the VPC) so that consumers can simply use a URL like ",Object(r.b)("a",{parentName:"p",href:"http://translate-api.local"},"http://translate-api.local"),", which will respond with one of/all (todo: check) the locations of the instances."),Object(r.b)("p",null,"To do this, we need to create an CM app, tell ECS to update it on up/down, and tell SM to integrate with Route53."),Object(r.b)("h2",{id:"integrating-cloud-map-with-ecs-using-cdk"},"Integrating Cloud Map with ECS using CDK"),Object(r.b)("p",null,"Again, we must add another CDK dependency to our stack first, this time it's the ",Object(r.b)("inlineCode",{parentName:"p"},"@aws-cdk/aws-servicediscovery")," package. Stop the ",Object(r.b)("inlineCode",{parentName:"p"},"npm run watch")," command and run the following commands: "),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"npm install @aws-cdk/aws-servicediscovery --save\nnpm run watch\n")),Object(r.b)("p",null,"Next, add the highlighted lines to the CDK stack."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="lib/ecs-microservices-stack.ts" {6,11-15,22-24}',title:'"lib/ecs-microservices-stack.ts"',"{6,11-15,22-24}":!0},"import * as cdk from '@aws-cdk/core';\nimport * as ec2 from \"@aws-cdk/aws-ec2\";\nimport * as ecs from \"@aws-cdk/aws-ecs\";\nimport * as ecr from \"@aws-cdk/aws-ecr\";\nimport * as iam from \"@aws-cdk/aws-iam\";\nimport * as servicediscovery from \"@aws-cdk/aws-servicediscovery\";\n...\nconst cluster = new ecs.Cluster(this, 'Cluster', {\n    vpc,\n    clusterName: 'ECS-Microservices-Workshop',\n    defaultCloudMapNamespace: {\n        name: 'local',\n        type: servicediscovery.NamespaceType.DNS_PRIVATE,\n        vpc\n    }\n})\n...\nconst service = new ecs.FargateService(this, 'TransateApiService', {\n    cluster,\n    serviceName: 'translate-api',\n    taskDefinition: taskDefinition,\n    cloudMapOptions: {\n        name: 'translate-api'\n    },\n    securityGroups: [sg],\n    desiredCount: 3\n})\n")),Object(r.b)("p",null,"The first addition says that we want AWS Cloud Map to create a namespace called ",Object(r.b)("inlineCode",{parentName:"p"},"local")," - namespace is basically a group of services - and to associate it with the ECS cluster."),Object(r.b)("p",null,"We specify that this namespace should make it's services discoverable via private DNS, which tells AWS Cloud Map to create a private hosted zone in Route53 for the namespace, and to associate it with the VPC specified. When services are added to this namespace, Cloud Map will create A records in the hosted zone mapping to the resources."),Object(r.b)("p",null,"The second change instructs ECS to create an AWS Cloud Map service called ",Object(r.b)("inlineCode",{parentName:"p"},"translate-api")," within the ",Object(r.b)("inlineCode",{parentName:"p"},"local")," namespace, and to associate the ECS service with it, which means AWS with automtically manage the adding/removing of instances to the service as it manages the ECS tasks."),Object(r.b)("p",null,"Because the namespace is set TODO, a private Route5 Hosted Zone is created for ",Object(r.b)("inlineCode",{parentName:"p"},"translate-api.local"),", which will return the addresses of the healthy translate-api services when queried from within the VPC."),Object(r.b)("p",null,"We can test this once the latest change has been rolled out by logging into the ",Object(r.b)("strong",{parentName:"p"},"bastion host")," using Session Manager, and running the following commands:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},'$ dig +short translate-api.local\n10.0.198.67\n10.0.142.110\n10.0.251.115\n\n$ curl http://translate-api.local/actuator/health\n{"status":"UP"}\n')))}l.isMDXComponent=!0},87:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),d=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=d(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},h=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=d(a),h=n,m=p["".concat(s,".").concat(h)]||p[h]||u[h]||i;return a?r.a.createElement(m,o(o({ref:t},l),{},{components:a})):r.a.createElement(m,o({ref:t},l))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,s=new Array(i);s[0]=h;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:n,s[1]=o;for(var l=2;l<i;l++)s[l]=a[l];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,a)}h.displayName="MDXCreateElement"}}]);