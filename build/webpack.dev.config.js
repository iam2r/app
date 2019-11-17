
process.env.NODE_ENV='development';
const baseConfig = require("./webpack.base");
const merge = require("webpack-merge");
const config = require("./config");
const utils = require("./utils");
const AutoDllPlugin = require('autodll-webpack-plugin');
const {
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
} = require("webpack");
const plugins = [
  new HotModuleReplacementPlugin(),
  new NoEmitOnErrorsPlugin(),
];

utils.isDll() && plugins.push(new AutoDllPlugin({
  inject: true, // will inject the DLL bundle to index.html
  debug: true,
  filename: '[name]_[contenthash:8].js',
  path: './dll',
  entry: {
    vendor: utils.getDllVendor()
  }
}))

module.exports = merge(baseConfig, {
  devtool: "cheap-module-eval-source-map", // 指定加source-map的方式
  devServer: {
    inline: true,
    hot: true, //热加载
    open: true,
    disableHostCheck: true,
    contentBase: config.staticPath, //静态文件根目录
    port: config.dev.port, // 端口
    host: '0.0.0.0',
    useLocalIp: true,
    writeToDisk: false,
    historyApiFallback: true, //html5 history API
    overlay: true,
    compress: false, // 服务器返回浏览器的时候是否启动gzip压缩
    proxy: config.dev.proxy
  },
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
  plugins
});;