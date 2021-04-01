(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{79:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return a})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n(3),i=(n(0),n(87));const o={id:"introduction",title:"Introduction",sidebar_label:"Introduction",slug:"/introduction"},a={unversionedId:"introduction",id:"introduction",isDocsHomePage:!1,title:"Introduction",description:"This is a guide that aims to introduce the AWS CDK by showing how it can be used to create and deploy the required infrastructure for a simple microservice based application. As well as introducing CDK, it will also introduce the basic concepts and features of a few AWS services, including VPCs, Elastic Container Service, AWS Cloud Map, and Route 53.",source:"@site/docs/introduction.md",slug:"/introduction",permalink:"/ecs-microservices-workshop/introduction",editUrl:"https://github.com/samdjstevens/ecs-microservices-workshop/edit/master/docs/introduction.md",version:"current",sidebar_label:"Introduction",sidebar:"someSidebar",next:{title:"My First Stack",permalink:"/ecs-microservices-workshop/my-first-stack"}},s=[{value:"What are we going to build?",id:"what-are-we-going-to-build",children:[]},{value:"Who is this workshop for?",id:"who-is-this-workshop-for",children:[]},{value:"A note on how to work through this workshop",id:"a-note-on-how-to-work-through-this-workshop",children:[]},{value:"Prerequisites",id:"prerequisites",children:[{value:"AWS account &amp; user",id:"aws-account--user",children:[]},{value:"AWS CLI",id:"aws-cli",children:[]},{value:"nodejs",id:"nodejs",children:[]},{value:"AWS CDK",id:"aws-cdk",children:[]}]},{value:"Setting up the environment",id:"setting-up-the-environment",children:[]}],c={toc:s};function l({components:e,...t}){return Object(i.b)("wrapper",Object(r.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(i.b)("p",null,"This is a guide that aims to introduce the AWS CDK by showing how it can be used to create and deploy the required infrastructure for a simple microservice based application. As well as introducing CDK, it will also introduce the basic concepts and features of a few AWS services, including ",Object(i.b)("strong",{parentName:"p"},"VPCs"),", ",Object(i.b)("strong",{parentName:"p"},"Elastic Container Service"),", ",Object(i.b)("strong",{parentName:"p"},"AWS Cloud Map"),", and ",Object(i.b)("strong",{parentName:"p"},"Route 53"),"."),Object(i.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"Following this guide will most-likely incur some cost in your AWS account."))),Object(i.b)("h3",{id:"what-are-we-going-to-build"},"What are we going to build?"),Object(i.b)("p",null,"At the end of this guide we will have built and deployed the infrastructure required for an online translation website, which (some would say labouredly) uses a simple service orientated architecture. "),Object(i.b)("p",null,"The application will let users translate text they supply from the source and target languages of their choosing via a simple UI."),Object(i.b)("h3",{id:"who-is-this-workshop-for"},"Who is this workshop for?"),Object(i.b)("p",null,"This workshop is for beginners to CDK/Infrastructure-as-Code who want to learn how to use it to set up a complex infratructure on AWS. No prior experience of AWS is required, but some familiarity will be helpful."),Object(i.b)("p",null,"This workshop is also for people interested in learning about some of the basic principles of Service Orientated Architecture (SOA)."),Object(i.b)("h3",{id:"a-note-on-how-to-work-through-this-workshop"},"A note on how to work through this workshop"),Object(i.b)("p",null,"The CDK code in this workshop is often quite terse, accomplishing a lot in a small amount of code. This is one of CDK's advantages over other IaC solutions, but can sometimes make it less obvious what is actually happening."),Object(i.b)("p",null,"In each section I have tried to explain a bit about the services being used, what resources are actually being created, and how they work together. For this reason, I don't recommend that you simply rush through copy pasting the CDK code unless you have already been introduced to the services/topics within."),Object(i.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(i.b)("h3",{id:"aws-account--user"},"AWS account & user"),Object(i.b)("p",null,"An AWS user with appropriate permissions and an access key & secret are needed to configure the AWS CLI."),Object(i.b)("h3",{id:"aws-cli"},"AWS CLI"),Object(i.b)("p",null,"Install the AWS CLI, which enables you to interact with with AWS from the CLI."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html"},"Installing on Linux/macOS/Unix")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html#install-msi-on-windows"},"Installing on Windows"))),Object(i.b)("h3",{id:"nodejs"},"nodejs"),Object(i.b)("p",null,"AWS CDK relies on nodejs >= v10.3.0. See the ",Object(i.b)("a",{parentName:"p",href:"https://nodejs.org/en/"},"nodejs")," website for instructions on installation."),Object(i.b)("h3",{id:"aws-cdk"},"AWS CDK"),Object(i.b)("p",null,"Install the CDK CLI tool by running:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"npm install -g aws-cdk\n")),Object(i.b)("p",null,"Check it is successfully installed by running:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"cdk --version\n")),Object(i.b)("h2",{id:"setting-up-the-environment"},"Setting up the environment"),Object(i.b)("p",null,"Make sure the AWS CLI is configured by running:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"aws configure\n")),Object(i.b)("p",null,"Once you're all set up, continue on to My First Stack, where we will build our very first CDK stack."))}l.isMDXComponent=!0},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),u=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=u(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},h=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(n),h=r,b=d["".concat(a,".").concat(h)]||d[h]||p[h]||o;return n?i.a.createElement(b,s(s({ref:t},l),{},{components:n})):i.a.createElement(b,s({ref:t},l))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var l=2;l<o;l++)a[l]=n[l];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"}}]);