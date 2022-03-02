import BundleAnalyzerPlugin from 'webpack-bundle-analyzer'
// import config from './webpack.config.js'
import webpack from 'webpack'

process.env.NODE_ENV = 'production'

export const analyze = async () => {
  const webpackConfigPath = './webpack-config-obj.js'
  // core.info(`Reading the webpack config file from ${webpackConfigPath}`);
  const { default: webpackConfigProd } = await import(webpackConfigPath)

  if (!webpackConfigProd.plugins) {
    webpackConfigProd['plugins'] = []
  }
  webpackConfigProd.plugins.push(
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: `output/report.html`,
    }),
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      analyzerMode: 'json',
      openAnalyzer: false,
      reportFilename: `output/report.json`,
    }),
  )
  const compiler = webpack(webpackConfigProd)
  await webpackBuild(compiler)
}
const webpackBuild = async (compiler) => {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (
        err ||
        (stats === null || stats === void 0 ? void 0 : stats.hasErrors())
      ) {
        reject(err)
      }
      compiler.close((closeErr) => {
        reject(closeErr)
      })
    })
    compiler.hooks.done.tap('ID', () => {
      resolve('compile finished')
    })
  })
}

analyze()
