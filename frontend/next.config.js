// WindiCSSのプラグイン
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

// next-transpile-modules を使うと Next 13.x で watchOptions 周りの TypeError が出るため
// 公式の transpilePackages を利用して同等機能を実現する
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    domains: ['localhost', 'cms-storage.cypas.sec'],
  },
  // 以前 withTM で指定していたパッケージ
  transpilePackages: ['@uiw/react-md-editor', '@uiw/react-markdown-preview'],
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
}
