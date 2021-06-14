const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin') // 清除编辑器报错
const CircularDependencyPlugin = require('circular-dependency-plugin') // 防止模块循环引用

const isLib = process.env.TYPE === 'lib'

module.exports = {
  chainWebpack(config) {
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
