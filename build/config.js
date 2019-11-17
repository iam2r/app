/**
 * 全局配置文件
 */

const path = require("path");
const fs = require('fs-extra')

let appName = '_test';
let titleMap = {
    '_test': '',
}


if (process.argv.includes("--modern") && !process.argv.includes("legacy")) {
    appName = process.env.APP_NAME || JSON.parse(fs.readFileSync(path.resolve(__dirname, './plugin/webpack/appName.json'), 'utf-8')).appName
} else {
    appName = process.env.APP_NAME || (process.argv.includes("--app") && process.argv[process.argv.indexOf('--app') + 1]) || appName;
}


module.exports = {
    appName: appName,
    htmlTitle: titleMap[appName] || appName,
    staticPath:path.resolve(__dirname,'../dist'),
    dev: {
        publicPath: "/",
        // port: 8080,
        assetsSubDirectory: "assets",
        proxy: {
            '/test': {
                target: 'https://www.iamzr.tk/', //设置你调用的接口域名和端口号       项目中/api代表https://www.iamzr.tk/api
                changeOrigin: true,
                pathRewrite: { //将/api字符串替换为空。
                    // '/api': '' // 访问'https://www.iamzr.tk/user/add'，直接写‘/ api / user / add’即可
                }
            },
            '/history-api': {
                target: 'http://lobby-egame-rng.sgplay.biz', //设置你调用的接口域名和端口号       项目中/api代表https://www.iamzr.tk/api
                changeOrigin: true,
                pathRewrite: { //将/api字符串替换为空。
                    '^/history-api': '' // 访问'https://www.iamzr.tk/user/add'，直接写‘/ api / user / add’即可
                }
            },
        }
    },
    build: {
        publicPath: `./`,
        assetsSubDirectory: "assets",
        cacheGroups: {

            config: {
                test: /[\\/]apps[\\/]\w+[\\/]config\.js/,
                name: 'config',
                chunks: "initial",
                enforce: true
            },
            vue: {
                test: /node_modules[\\/]vue/,
                name: "vueAll",
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
        }
    },
    polyfills: [
        'es.array.iterator',
    ],
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
    inlineLimit: 4096,
    dllVendorBlackList: [/^@/, /\.css$/, /antd|vant|element-ui|mint-ui|core-js|regenerator-runtime/]
};