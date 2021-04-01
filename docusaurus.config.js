module.exports = {
  title: 'ECS Microservices with CDK',
  tagline: 'A workshop around using ECS with CDK.',
  url: 'https://samdjstevens.github.io',
  baseUrl: '/ecs-microservices-workshop/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'samdjstevens',
  projectName: 'ecs-microservices-workshop',
  themeConfig: {
    navbar: {
      title: 'ECS Microservices with CDK',
      logo: {
        alt: 'ECS Microservices with CDK',
        src: 'img/cdk-logo.png',
      },
      items: [
        {
          href: 'https://github.com/samdjstevens/ecs-microservices-workshop',
          label: 'View on GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/samdjstevens/ecs-microservices-workshop/edit/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
