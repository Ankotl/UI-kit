const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: ['../src/assets'],
  webpackFinal: async (config, { configType }) => {        
    config.resolve.plugins = [new TsconfigPathsPlugin()];  
    return config;                                         
  }
}

/* TODO nice to have features */
/* https://storybook.js.org/docs/react/writing-tests/introduction */
