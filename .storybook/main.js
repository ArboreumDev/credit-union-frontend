const path = require("path")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [path.resolve(__dirname, "../src"), "node_modules"]
    return config
  },
}
