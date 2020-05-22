/**
 * 全局配置文件
 */

const path = require("path");
const { apps } = require("./const");

module.exports = {
    titleMap: {
        [apps.blog]: '',
    },
    staticPath: path.resolve(__dirname, '../dist'),
    dev: {
        publicPath: "",
        assetsSubDirectory: "assets",
        proxy: {

        }
    },
    build: {
        publicPath: "",
        assetsSubDirectory: "assets",
        cacheGroups: {
            config: {
                test: /[\\/]apps[\\/]\w+[\\/]config\.js/,
                name: 'config',
                chunks: "initial",
                enforce: true
            },
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                chunks: "initial",
                name: "vendors",
                priority: -10,
                enforce: true
            },
            vendors_async: {
                test: /[\\/]node_modules[\\/]/,
                chunks: "async",
                name: "vendors-async",
                priority: -10,
                enforce: true
            },
        },
        mode: {
            normal: 'normal',//传统 
            legacy: 'legacy',//现代-兼容
            modern: 'modern'//现代-现代
        }
    },
    demandList: [
        ["component", {
            libraryName: "antd",
            style: 'style/index.css'
        }, "ant"],
        ["component", {
            libraryName: "iview",
            libDir: "src/components",
            style: false,
            // styleLibrary: {
            //     "name":"~node_modules/iview/src/styles/components",
            //     "path":"[module].less"
            // }
        }, "iview"],
        ["component", {
            libraryName: 'vant',
            libDir: 'es',
            style: 'index.css',
        }, 'vant'],
        ["component", {
            libraryName: "mint-ui",
        }, 'mint-ui'],
        ["component", {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk"
        }, 'element-ui'],
        ["component", {
            style: false,
            camel2Dash: false,
            libraryName: 'lodash',
            libDir: '',
        }, 'lodash']
    ],
    appsTypes: {
        react: [apps.test_react],
        vue: [apps.blog, apps.home, apps.birthday]
    },
    inlineLimit: 4096,
    dllVendorBlackList: [/^@/, /\.css$/, /antd|vant|element-ui|mint-ui|core-js|regenerator-runtime/],
    transpileDepRegex: /swiper|dom7/ //node_modules中参与转码的项目
};