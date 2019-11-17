"use strict";
process.env.NODE_ENV = 'production';
const path = require("path");
const utils = require("./utils");
const config = require("./config");
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清空打包目录的插件
const seen = new Set();
const nameLength = 4;
const {
    HashedModuleIdsPlugin,
    NamedChunksPlugin
} = require("webpack");
const baseConfig = require("./webpack.base");
const merge = require("webpack-merge");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //CSS文件单独提取出来
const {
    BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");
const OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");
const cacheGroups = require("./config").build.cacheGroups;
const ModernModePlugin = require('./plugin/webpack/ModernModePlugin');
const BUILDMODE = config.build.mode;
const plugins = [

    new NamedChunksPlugin(chunk => {
        if (chunk.name) {
            return chunk.name
        }
        const modules = Array.from(chunk.modulesIterable);
        if (modules.length > 1) {
            const hash = require("hash-sum");
            const joinedHash = hash(modules.map(m => m.id).join("_"));
            let len = nameLength;
            while (seen.has(joinedHash.substr(0, len))) len++;
            seen.add(joinedHash.substr(0, len));
            return `chunk-${joinedHash.substr(0, len)}`;
        } else {
            return modules[0].id;
        }
    }),

    new HashedModuleIdsPlugin({
        hashDigest: 'hex'
    }),
    new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css"
    }),
]



//modern时清除.cache-loader，保证babel配置修改后生效

if (process.env.BUILD_MODE !== BUILDMODE.modern) { //modern时不需要清理
    plugins.push(new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [config.staticPath + "/" + process.env.APP_NAME],
        dangerouslyAllowCleanPatternsOutsideProject: true,
        verbose: true,
        dry: false,
    }))
}

if (utils.isReport() && process.env.BUILD_MODE !== BUILDMODE.legacy) {
    plugins.push(new BundleAnalyzerPlugin())
}

if (process.env.BUILD_MODE !== BUILDMODE.normal) {
    plugins.push(new ModernModePlugin({
        targetDir: config.staticPath,
        isModernBuild: process.env.BUILD_MODE == BUILDMODE.modern,
        unsafeInline: false,
        publicPath: utils.isDev() ? config.dev.publicPath : config.build.publicPath
    }))
}

module.exports = merge(baseConfig, {
    devtool: "false",
    optimization: {
        splitChunks: {
            cacheGroups
        },
        runtimeChunk: {
            name: "runtime"
        },
        //runtimeChunk是webpack固定生成的一段代码，用来维护模块之间的以来关系的，比如给每个模块一个ID之类的，这部分代码跟你写的代码完全没有关系，所以单独切割出来能够防止他的变化影响你自己的代码的hash变化
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                warningsFilter: () => true,
                extractComments: false,
                sourceMap: true,
                cache: true,
                cacheKeys: defaultCacheKeys => defaultCacheKeys,
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        pure_funcs: ['console.warn', 'console.log'],
                        inline: true,
                        booleans: true,
                        if_return: true,
                        sequences: true,
                        unused: true,
                        conditionals: true,
                        dead_code: true,
                        evaluate: true,
                        drop_debugger: true
                    },

                    mangle: {
                        safari10: true
                    }
                }
            }),
            new OptimizeCssnanoPlugin({
                sourceMap: false,
                cssnanoOptions: {
                    preset: [
                        'default',
                        {
                            mergeLonghand: false,
                            cssDeclarationSorter: false
                        }
                    ]
                }
            }),
        ],



    },
    plugins
});