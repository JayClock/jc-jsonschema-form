const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin') // 清除编辑器报错
const CircularDependencyPlugin = require('circular-dependency-plugin') // 防止模块循环引用

module.exports = {
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
