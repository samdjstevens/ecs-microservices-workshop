(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{77:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return a})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n(3),o=(n(0),n(85));const i={id:"introduction",title:"Introduction",sidebar_label:"Introduction",slug:"/introduction"},a={unversionedId:"introduction",id:"introduction",isDocsHomePage:!1,title:"Introduction",description:"This is a guide that aims to introduce the AWS CDK by showing how it can be used to create and deploy the required infrastructure for a simple microservice based application. As well as introducing CDK, it will also introduce the basic concepts and features of a few AWS services, including VPCs, Elastic Container Service, AWS Cloud Map, and Route 53.",source:"@site/docs/introduction.md",slug:"/introduction",permalink:"/ecs-microservices-workshop/introduction",editUrl:"https://github.com/samdjstevens/ecs-microservices-workshop/edit/master/docs/introduction.md",version:"current",sidebar_label:"Introduction",sidebar:"someSidebar",next:{title:"My First Stack",permalink:"/ecs-microservices-workshop/my-first-stack"}},s=[{value:"What are we going to build?",id:"what-are-we-going-to-build",children:[]},{value:"Who is this workshop for?",id:"who-is-this-workshop-for",children:[]},{value:"A note on how to work through this workshop",id:"a-note-on-how-to-work-through-this-workshop",children:[]},{value:"Pre-requisites",id:"pre-requisites",children:[{value:"AWS account &amp; user",id:"aws-account--user",children:[]},{value:"AWS CLI",id:"aws-cli",children:[]},{value:"nodejs",id:"nodejs",children:[]},{value:"AWS CDK",id:"aws-cdk",children:[]}]},{value:"Setting up the environment",id:"setting-up-the-environment",children:[]}],c={toc:s};function l({components:e,...t}){return Object(o.b)("wrapper",Object(r.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This is a guide that aims to introduce the AWS CDK by showing how it can be used to create and deploy the required infrastructure for a simple microservice based application. As well as introducing CDK, it will also introduce the basic concepts and features of a few AWS services, including ",Object(o.b)("strong",{parentName:"p"},"VPCs"),", ",Object(o.b)("strong",{parentName:"p"},"Elastic Container Service"),", ",Object(o.b)("strong",{parentName:"p"},"AWS Cloud Map"),", and ",Object(o.b)("strong",{parentName:"p"},"Route 53"),"."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Warning"),": Following this guide will most-likely incur some cost in your AWS account."),Object(o.b)("h3",{id:"what-are-we-going-to-build"},"What are we going to build?"),Object(o.b)("p",null,"At the end of this workshop we will have built and deployed the infrastructure and code required for an online translation webapp, which (some would say labouredly) uses a simple service orientated architecture. "),Object(o.b)("p",null,"The application will allow users to translate text they supply from the source and target languages of their choosing."),Object(o.b)("h3",{id:"who-is-this-workshop-for"},"Who is this workshop for?"),Object(o.b)("p",null,"This workshop is for beginners to CDK/Infrastructure-as-Code who want to learn how to use it to set up a complex infratructure on AWS. No prior experience of AWS is required, but some familiarilty will be helpful."),Object(o.b)("p",null,"This workshop is also for people interested in learning about some of the basic principles of Service Orientated Architecture (SOA)."),Object(o.b)("h3",{id:"a-note-on-how-to-work-through-this-workshop"},"A note on how to work through this workshop"),Object(o.b)("p",null,"The CDK code in this workshop is often quite terse - and sometimes mysterious - accomplishing a lot in a small amount of code. This is one of CDK's advantages over other IaC solutions, but can sometimes make it less obvious what is actually happening."),Object(o.b)("p",null,"In each section I have tried to explain a bit about the services being used, what resources are actually being created, and how they work together. For this reason, I don't recommend that you simply rush through copy pasting the CDK code unless you have already been introduced to the services/topics within."),Object(o.b)("p",null,"Speaking of copy and pasting the code examples, I don't recommend that you do this either. If you use an editor like VS Code, there are great CDK plugins which make writing CDK very easy, with features such as autocomplete and documentation showing, and will often help you find the property/method you are after without Googling."),Object(o.b)("h2",{id:"pre-requisites"},"Pre-requisites"),Object(o.b)("h3",{id:"aws-account--user"},"AWS account & user"),Object(o.b)("p",null,"An AWS user with appropriate permissions and an access key & secret are needed to configure the AWS CLI."),Object(o.b)("h3",{id:"aws-cli"},"AWS CLI"),Object(o.b)("p",null,"Install the AWS CLI, which enables you to interact with with AWS from the CLI."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html"},"Installing on Linux/macOS/Unix")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{parentName:"li",href:"https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html#install-msi-on-windows"},"Installing on Windows"))),Object(o.b)("h3",{id:"nodejs"},"nodejs"),Object(o.b)("p",null,"AWS CDK relies on nodejs >= v10.3.0. See the ",Object(o.b)("a",{parentName:"p",href:"https://nodejs.org/en/"},"nodejs")," website for instructions on installation."),Object(o.b)("h3",{id:"aws-cdk"},"AWS CDK"),Object(o.b)("p",null,"Install the CDK CLI tool by running:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"npm install -g aws-cdk\n")),Object(o.b)("p",null,"Check it is successfully installed by running:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"cdk --version\n")),Object(o.b)("h2",{id:"setting-up-the-environment"},"Setting up the environment"),Object(o.b)("p",null,"Make sure the AWS CLI is configured by running:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"aws configure\n")),Object(o.b)("p",null,"Once you're all set up, continue on to My First Stack, where we will build our very first CDK stack."))}l.isMDXComponent=!0},85:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),u=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=u(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},h=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(n),h=r,b=d["".concat(a,".").concat(h)]||d[h]||p[h]||i;return n?o.a.createElement(b,s(s({ref:t},l),{},{components:n})):o.a.createElement(b,s({ref:t},l))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"}}]);