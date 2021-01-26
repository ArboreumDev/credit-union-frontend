const path = require("path")

module.exports = (webpackConfig, env) => {
  webpackConfig.resolve.modules = [
    path.resolve(__dirname, "./src"),
    "node_modules",
  ]
  return webpackConfig
}
