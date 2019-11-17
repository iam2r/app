const {
    polyfills,
    demandList
} = require("./build/config");
let envOptions = {
    useBuiltIns: "usage",
    modules: false,
    debug: false,
    corejs: {
        version: 3,
        proposals: true
    },
    // exclude: utils.isModernBuild() ? [] : polyfills,
}
let isModern = process.env.BUILD_MODE == 'modern';
if (isModern) {
    delete envOptions.corejs;
    envOptions = {
        ...envOptions,
        useBuiltIns: false,
        targets: {
            esmodules: true
        }
    }
}

const presets = [
    [
        "@babel/preset-env",
        envOptions
    ],
]



const appsTypes = {
    react: ['test-react'],
    vue: ['blog', 'test-vue','vant_study']
}

appsTypes.react.includes(process.env.APP_NAME) && presets.push("@babel/preset-react");
appsTypes.vue.includes(process.env.APP_NAME) && presets.push("@vue/babel-preset-jsx");

const plugins = [
    ...demandList,
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-syntax-dynamic-import"
]


// polyfills 为node_modules/core-js/modules下js文件名列表 如['es.array.every','es.array.flat'] 等  会强行注入这些方法
!isModern && plugins.push([require("./build/plugin/babel/polyfillsPlugin"), {
    polyfills
}])

module.exports = {
    presets,
    plugins
}