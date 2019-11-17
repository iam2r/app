"use strict";
const utils = require("./utils");
const config = require("./config");
const fs = require('fs-extra')
const path = require("path");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //CSS文件单独提取出来
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html的插件
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制静态资源的插件
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const {
    ProvidePlugin,
    DefinePlugin
} = require("webpack");

const BUILDMODE = config.build.mode;

process.env.BUILD_MODE = (() => {
    let mode = utils.getBuildMode();
    for (const key in mode) {
        if (mode[key]) {
            return key
        } else {
            continue
        }
    }
})();
process.env.APP_NAME = utils.getAppName('test');

const createEntryAndHtml = pageList => pageList.reduce((pre, page) => {
    let html = new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `../public/${page}.html`),
        title: config.titleMap[process.env.APP_NAME] || ``,
        filename: `${page}.html`,
        inject: "body",
        parmas: {
            appName: process.env.APP_NAME ? process.env.APP_NAME : '',
        },
        minify: {
            removeComments: !utils.isDev(),
            collapseWhitespace: !utils.isDev(),
            removeAttributeQuotes: !utils.isDev(), //压缩 去掉引号
            collapseBooleanAttributes: !utils.isDev(),
            removeScriptTypeAttributes: !utils.isDev()
        },
        chunksSortMode: "dependency",
    })
    pre.entry[page] = path.resolve(__dirname, `../src/${page}.ts`);
    pre.html.push(html)
    return pre
}, {
    entry: {},
    html: []
});



const createCssLoader = (isModules, lang = 'scss') => [
    utils.isDev() ?
        "vue-style-loader" : {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: "../"
            }
        },
    {
        loader: "css-loader",
        options: isModules === true ? {
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]-[local]-[hash:base64:5]'
        } : {
                importLoaders: 2,
            }
    },
    "postcss-loader",
    lang == 'less' ? {
        loader: "less-loader",
    } : {
            loader: "sass-loader",
            options: {
                data: `
      @import "@/styles/_config.scss";
      @import "@/styles/_mixins.scss";
      `
            }
        }
]

const createWebFontsLoader = () => {
    let uses = [
        utils.isDev() ? "vue-style-loader" : {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: "../"
            }
        },
        'css-loader',
        'webfonts-loader'
    ];
    return uses
}

const transformer = error => {
    const rules = [{
        type: 'cant-resolve-loader',
        re: /Can't resolve '(.*loader)'/,
        msg: (e, match) => (
            `Failed to resolve loader: ${chalk.yellow(match[1])}\n` +
            `You may need to install it.`
        )
    }]
    if (error.webpackError) {
        const message = typeof error.webpackError === 'string' ?
            error.webpackError :
            error.webpackError.message || ''

        console.log('message:' + message)
        for (const {
            re,
            msg,
            type
        } of rules) {
            const match = message.match(re)
            if (match) {
                return Object.assign({}, error, {
                    type,
                    shortMessage: msg(error, match)
                })
            }
        }
        // no match, unknown webpack error without a message.
        // friendly-error-webpack-plugin fails to handle this.
        if (!error.message) {
            return Object.assign({}, error, {
                type: 'unknown-webpack-error',
                shortMessage: message
            })
        }
    }
    return error
}
const formatter = errors => {
    errors = errors.filter(e => e.shortMessage)
    if (errors.length) {
        return errors.map(e => e.shortMessage)
    }
}

const {
    entry,
    html
} = createEntryAndHtml(utils.getFileNameList("./public", "html"));

const plugins = [
    ...html,
    new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
            /\.map$/,
            /hot-update\.js$/
        ]
    }),
    new PreloadWebpackPlugin({
        rel: 'prefetch',
        include: 'asyncChunks'
    }),
    new DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            APP_NAME: JSON.stringify(process.env.APP_NAME)
        },
    }),
    new VueLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    new ProgressBarPlugin({
        format: `${chalk.cyan.bold(`${process.env.BUILD_MODE}: build `)}${chalk.bold('[')}:bar${chalk.bold(']')}${chalk.green.bold(":percent")}(:elapsed seconds)`
    }),
    new ProvidePlugin({
        React: 'react'
    }),
    new FriendlyErrorsWebpackPlugin({
        additionalTransformers: [transformer],
        additionalFormatters: [formatter]
    }),
]



const copyWebpackOptions = [{
    from: path.resolve(__dirname, `../public`),
    to: config.staticPath + "/" + process.env.APP_NAME,
    toType: 'dir',
    ignore: [
        'index.html',
        '.DS_Store'
    ]
}, {
    from: path.resolve(__dirname, `../src/apps/${process.env.APP_NAME}/_public`),
    to: config.staticPath + "/" + process.env.APP_NAME,
    toType: 'dir',
    ignore: [
        '.DS_Store'
    ]
}]

plugins.push(new CopyWebpackPlugin(copyWebpackOptions.filter(({
    from
}) => fs.existsSync(from))))

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, "../"), //绝对路径，用于从配置中解析入口起点(entry point)和加载器(loader)，以后若设置相对路径 相对当前目录的上一级
    entry,
    node: {
        setImmediate: false,
        process: 'mock',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    output: {
        path: config.staticPath + "/" + process.env.APP_NAME,
        publicPath: utils.isDev() ? config.dev.publicPath : config.build.publicPath,
        filename: utils.isDev() ? "js/[name].js" : `js/[name]${process.env.BUILD_MODE == BUILDMODE.legacy ? `-${BUILDMODE.legacy}` : ''}.[contenthash:8].js`,
        chunkFilename: utils.isDev() ? "js/[name].js" : `js/[name]${process.env.BUILD_MODE == BUILDMODE.legacy ? `-${BUILDMODE.legacy}` : ''}.[contenthash:8].js`
    },

    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.vue',
            '.json'
        ],
        alias: {
            '@': path.resolve(__dirname, `../src`),
            'appdir': path.resolve(__dirname, `../src/apps/${process.env.APP_NAME}`)
        } //配置别名可以加快webpack查找模块的速度
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync|react|react-dom)$/,
        // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
        rules: [{
            test: /\.(j|t)sx?$/,
            exclude: [
                filepath => {
                    if (process.env.BUILD_MODE == BUILDMODE.modern) { //modern模式时全部走loader
                        return false
                    }
                    return /node_modules/.test(filepath)
                }
            ],

            oneOf: [{
                test: /\.font\.\w+$/,
                use: createWebFontsLoader()
            },
            {
                use: [{
                    loader: 'cache-loader',
                    options: {
                        cacheIdentifier: utils.isDev() ? 'dev' : process.env.BUILD_MODE == BUILDMODE.modern ? BUILDMODE.modern : BUILDMODE.legacy,
                        cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/babel-loader')
                    }
                },
                    "thread-loader",
                    "babel-loader",
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        happyPackMode: true
                    }
                }
                ]
            }
            ],

        },

        {
            test: /\.vue$/,
            use: [{
                loader: 'cache-loader',
                options: {
                    cacheIdentifier: utils.isDev() ? 'dev' : process.env.BUILD_MODE == BUILDMODE.modern ? BUILDMODE.modern : BUILDMODE.legacy,
                    cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/vue-loader')
                }
            },
            {
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    },
                }
            }
            ],
        },
        {
            test: /\.s?css$/,
            oneOf: [
                // 这里匹配 `<style module>`
                {
                    resourceQuery: /module/,
                    use: createCssLoader(true)
                }, {
                    test: /\.module\.\w+$/,
                    use: createCssLoader(true)
                },
                {
                    use: createCssLoader()
                }
            ],

        },
        {
            test: /\.less$/,
            oneOf: [{
                resourceQuery: /module/,
                use: createCssLoader(true, 'less')
            }, {
                test: /\.module\.\w+$/,
                use: createCssLoader(true, 'less')
            },
            {
                use: createCssLoader(false, 'less')
            }
            ]

        },
        {
            test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
            loader: "url-loader",
            options: {
                name: utils.assetsPath("images/[name].[hash:8].[ext]"), // 图片输出的路径
                limit: config.inlineLimit,
            }
        },
        {
            test: /\.yml$/,
            loader: 'yml-loader'
        },
        {
            test: /\.(svg)(\?.*)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash:8].[ext]'
                }
            }]
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: config.inlineLimit,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: utils.assetsPath("media/[name].[hash:8].[ext]")
                        }
                    }
                }
            }]
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
            loader: "url-loader",
            options: {
                limit: config.inlineLimit,
                fallback: {
                    loader: 'file-loader',
                    options: {
                        name: utils.assetsPath("fonts/[name].[hash:8].[ext]")
                    }
                }

            }
        },
        ]
    },

    plugins
};