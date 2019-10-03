const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
  },

  configureWebpack: {
    plugins: [
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      }),
    ],
  },
}
