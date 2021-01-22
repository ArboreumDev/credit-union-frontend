const path = require("path")

module.exports = (webpackConfig, env) => {
  let baseConfig = {
    resolve: {
      modules: [path.resolve(__dirname, ".."), "node_modules"],
      alias: {
        ...webpackConfig.resolve.alias,
        components: path.resolve(__dirname, "src/components"),
        "lib/*": path.resolve(__dirname, "src/lib"),
      },
    },
  }
  return { ...webpackConfig, ...baseConfig }
}
