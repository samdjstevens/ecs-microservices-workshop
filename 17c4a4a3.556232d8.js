(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{68:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return o})),n.d(t,"default",(function(){return l}));var a=n(3),r=(n(0),n(87));const i={id:"vpc",title:"Creating the VPC",sidebar_label:"Creating the VPC",slug:"/creating-the-vpc"},c={unversionedId:"vpc",id:"vpc",isDocsHomePage:!1,title:"Creating the VPC",description:"What is a VPC?",source:"@site/docs/vpc.md",slug:"/creating-the-vpc",permalink:"/ecs-microservices-workshop/creating-the-vpc",editUrl:"https://github.com/samdjstevens/ecs-microservices-workshop/edit/master/docs/vpc.md",version:"current",sidebar_label:"Creating the VPC",sidebar:"someSidebar",previous:{title:"Translatr",permalink:"/ecs-microservices-workshop/project-description"},next:{title:"Creating the Cluster",permalink:"/ecs-microservices-workshop/cluster"}},o=[{value:"What is a VPC?",id:"what-is-a-vpc",children:[]},{value:"What are subnets?",id:"what-are-subnets",children:[]},{value:"Our VPC requirements",id:"our-vpc-requirements",children:[]},{value:"Creating the VPC with CDK",id:"creating-the-vpc-with-cdk",children:[]},{value:"Viewing the VPC",id:"viewing-the-vpc",children:[]},{value:"Creating a bastion host",id:"creating-a-bastion-host",children:[]}],s={toc:o};function l({components:e,...t}){return Object(r.b)("wrapper",Object(a.a)({},s,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"what-is-a-vpc"},"What is a VPC?"),Object(r.b)("p",null,"A Virtual Private Network (VPC) is a ",Object(r.b)("strong",{parentName:"p"},"logically isolated")," virtual network, dedicated to your AWS account. With a VPC, you can specify the I.P. addresses the network should use, and place AWS resources you create (e.g. EC2 instances, RDS databases, etc) within it."),Object(r.b)("h2",{id:"what-are-subnets"},"What are subnets?"),Object(r.b)("p",null,"VPCs can be split into smaller networks, called subnets, which are defined by an I.P range that is a subset of the VPC I.P. range. A subnet must be associated with a single Availability Zone (AZ) within the region the VPC is deployed to, and cannot span multiple AZs."),Object(r.b)("p",null,"Subnets are said to be ",Object(r.b)("strong",{parentName:"p"},"public")," if they are associated with a route table that has a route to an ",Object(r.b)("strong",{parentName:"p"},"Internet Gateway (IGW)"),". Having this route in place enables inbound and outbound internet traffic to resources placed inside the subnet, exposing them to the internet."),Object(r.b)("p",null,"Conversly, if a subnet does not contain such a route to an IGW, it is said to be a ",Object(r.b)("strong",{parentName:"p"},"private")," subnet. Resources placed inside of private subnets are not publically accessible from the internet, and to send outbound traffic out to the internet, they must do so via a ",Object(r.b)("strong",{parentName:"p"},"Nat Gateway")," of ",Object(r.b)("strong",{parentName:"p"},"Nat Instance"),", which allow resources to talk out to the internet without being exposed themselves."),Object(r.b)("h2",{id:"our-vpc-requirements"},"Our VPC requirements"),Object(r.b)("p",null,"We want the VPC we build to contain ",Object(r.b)("strong",{parentName:"p"},"subnets in different Availability Zones (AZs)"),", so that we can place resources across them for ",Object(r.b)("strong",{parentName:"p"},"high availability"),". If one AZ were to experience an outage, our application would not go down, as it would continue being served from the other AZs."),Object(r.b)("p",null,"We also want both ",Object(r.b)("strong",{parentName:"p"},"public subnets"),", where we can put things that need to be reachable by the internet (e.g. load balancers), and ",Object(r.b)("strong",{parentName:"p"},"private subnets"),", where we can put things that we don't want exposed to the internet (e.g. application containers), so we can follow best security practices."),Object(r.b)("p",null,"To achieve this we will need to create multiple subnets, an ",Object(r.b)("strong",{parentName:"p"},"Internet Gateway (IGW)"),", multiple ",Object(r.b)("strong",{parentName:"p"},"NAT Gateways"),", and all the necessary configuration between the resources."),Object(r.b)("h2",{id:"creating-the-vpc-with-cdk"},"Creating the VPC with CDK"),Object(r.b)("p",null,"To build a VPC with all of the above requirements, first we need to add the ",Object(r.b)("inlineCode",{parentName:"p"},"@aws-cdk/aws-ec2")," dependency to our stack. Stop the ",Object(r.b)("inlineCode",{parentName:"p"},"npm run watch")," command and run the following commands: "),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"npm install @aws-cdk/aws-ec2 --save\nnpm run watch\n")),Object(r.b)("p",null,"Next, add the highlighted lines to your stack:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="lib/ecs-microservices-stack.ts" {2,8-11}',title:'"lib/ecs-microservices-stack.ts"',"{2,8-11}":!0},"import * as cdk from '@aws-cdk/core';\nimport * as ec2 from \"@aws-cdk/aws-ec2\";\n\nexport class EcsMicroservicesStack extends cdk.Stack {\n  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {\n    super(scope, id, props);\n\n    const vpc = new ec2.Vpc(this, 'ClusterVpc', {\n        cidr: '10.0.0.0/16',\n        maxAzs: 2\n    })\n\n  }\n}\n")),Object(r.b)("p",null,"Finally, run ",Object(r.b)("inlineCode",{parentName:"p"},"cdk deploy")," to deploy the changes to the stack."),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"How does this work?")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"By default, the ",Object(r.b)("inlineCode",{parentName:"p"},"Vpc")," construct will create a public and private subnet in each AZ in the region being deployed to, up to the maximum defined in the ",Object(r.b)("inlineCode",{parentName:"p"},"maxAzs")," option (defaulting to 3). It will automatically assign the subnet CIDR blocks, create an Internet Gateway, the NAT Gateways, and hook them all up together."))),Object(r.b)("h2",{id:"viewing-the-vpc"},"Viewing the VPC"),Object(r.b)("p",null,"Once the deploy of the stack has successfully finished, ",Object(r.b)("a",{parentName:"p",href:"https://eu-west-1.console.aws.amazon.com/vpc/home?region=eu-west-1"},"take a look in the AWS console")," and find your VPC."),Object(r.b)("p",null,"The following resources will have been created and configured in your AWS account:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"A VPC with the CIDR block of ",Object(r.b)("inlineCode",{parentName:"li"},"10.0.0.0/16"),"."),Object(r.b)("li",{parentName:"ul"},"Two public subnets, each in a different Availability Zone."),Object(r.b)("li",{parentName:"ul"},"An Internet Gateway (IGW), associated with the VPC."),Object(r.b)("li",{parentName:"ul"},"Routes added to the IGW in each of the two public subnet's route tables."),Object(r.b)("li",{parentName:"ul"},"Two private subnets, each in a different Availability Zone."),Object(r.b)("li",{parentName:"ul"},"A NAT Gateway for each private subnet."),Object(r.b)("li",{parentName:"ul"},"Routes added to the NAT Gateways in each of the two private subnet's route tables.")),Object(r.b)("h2",{id:"creating-a-bastion-host"},"Creating a bastion host"),Object(r.b)("p",null,"We've created the VPC, which contains two private subnets. Later, when we deploy resources into these subnets, we won't be able to reach them from outside of the VPC (from our local machines). When we're poking around and testing some of the things we deploy later, we will need to have an instance in a ",Object(r.b)("em",{parentName:"p"},"public")," subnet, from which we will be able to connect to resources in the private subnets."),Object(r.b)("p",null,"An instance used in this way is called a ",Object(r.b)("em",{parentName:"p"},"bastion")," or ",Object(r.b)("em",{parentName:"p"},"jump")," host. We will quickly create one now so we can use it when we need to later."),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Security note")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"A real, production-grade bastion host would be security-hardened to protect against un-authorised use. This is just for demo purposes."))),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="lib/ecs-microservices-stack.ts" {13-16}',title:'"lib/ecs-microservices-stack.ts"',"{13-16}":!0},"import * as cdk from '@aws-cdk/core';\nimport * as ec2 from \"@aws-cdk/aws-ec2\";\n\nexport class EcsMicroservicesStack extends cdk.Stack {\n  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {\n    super(scope, id, props);\n\n    const vpc = new ec2.Vpc(this, 'ClusterVpc', {\n        cidr: '10.0.0.0/16',\n        maxAzs: 2\n    })\n\n    // Create a bastion EC2 instance we can use to hit private I.P addresses\n    const bastion = new ec2.BastionHostLinux(this, 'Bastion', {\n      vpc\n    })\n\n  }\n}\n")),Object(r.b)("p",null,"Now the VPC is created, we are ready to continue on to creating the ECS Cluster, in which the app's services will run."))}l.isMDXComponent=!0},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return h}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},b=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=p(n),d=a,h=b["".concat(c,".").concat(d)]||b[d]||u[d]||i;return n?r.a.createElement(h,o(o({ref:t},l),{},{components:n})):r.a.createElement(h,o({ref:t},l))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,c=new Array(i);c[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,c[1]=o;for(var l=2;l<i;l++)c[l]=n[l];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);