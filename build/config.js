/**
 * 全局配置文件
 */

const path = require("path");

module.exports = {
    titleMap: {
        'blog': '',
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
        },
        mode: {
            normal: 'normal',//传统 
            legacy: 'legacy',//现代-兼容
            modern: 'modern'//现代-现代
        }
    },
    polyfills: [
        // promise polyfill alone doesn't work in IE,
        // needs this as well. see: #1642
        'es.array.iterator',
        // this is required for webpack code splitting, vuex etc.
        'es.promise',
        // this is needed for object rest spread support in templates
        // as vue-template-es2015-compiler 1.8+ compiles it to Object.assign() calls.
        'es.object.assign',
        // #2012 es6.promise replaces native Promise in FF and causes missing finally
        'es.promise.finally'
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
    appsTypes:{
        react: ['test-react'],
        vue: ['blog', 'home']
    },
    inlineLimit: 4096,
    dllVendorBlackList: [/^@/, /\.css$/, /antd|vant|element-ui|mint-ui|core-js|regenerator-runtime/]
};