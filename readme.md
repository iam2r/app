# my-cli

这是一个自用的脚手架，暂且叫 my-cli。

**目前能够支持 React、Vue 等常规 web 框架，支持`Typescript(or Javascript)+Vue(or React)+Scss`**

## 说明

### scripts 说明

- `npm start`:采用 dll 动态链的形式进行 dev 模式开发，将`"dependencies"`中能先行打包的依赖先打包在 Dist 目录，后通过`HtmlWebpackPlugin`插件的`parmas`参数将 dll 打包生成的 vendor.js 的路径传入 html。

**特点：dependencies 下面的插件只用打包一次，以后全从 dll 生成的 vendor.js 中找，加速热开发效率**

- npm run dev`:常规的dev模式，`"dependencies"`中库不是很多时，可选用这种速度也挺快的。

- ` npm run dev -- -- app demo`: demo是src/apps中的项目名称

- `npm run build`:常规模式构建，生成兼容的 legacy 模式代码。

- `npm run build:modern`:现代模式构建，实现`vue-cli 3.0`的现代模式([Vue CLI3.0 现代模式](https://cli.vuejs.org/zh/guide/browser-compatibility.html#%E7%8E%B0%E4%BB%A3%E6%A8%A1%E5%BC%8F))

### build 目录说明

此外目录为开发项目所需的一些 webpack 以及 babel 的相关配置

- `config.js` ：为整个项目开发用的配置文件。
- `plugin目录` ：webpack 以及 babel 的 plugin。
  - `polyfillsPlugind.js`:bable 插件，用来为 legacy 模式的包打包默认 polyfills，默认值为`[
    'es.array.iterator',
    'es.promise',
    'es.promise.finally'
  ]`
  - `ModernModePlugin.js`:webpack 插件，用来实现`npm run build:modern`模式的插件。
  - `CorsPlugin.js`:webpack 插件，解决跨域。

### [@babel/preset-env]

官方包增加了@标识  
核心的有

- `@babel/core`
- `@babel/preset-env`
- ~~`stage`~~(bable7 已经废除)

## dev 模式
``` js
{
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns:"usage",
        modules: false,
        debug: false,
        corejs: {
          version: 3,
          proposals: true
        },
      }
    ]
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "polyfillsPlugin"
  ]
}
```
**设置 useBuiltIns: "usage"  
配合"@babel/plugin-transform-runtime" options,开发时 自动从@babel/runtime-corejs3 中引入 polyfill。
**

## legacy 模式
``` js
{
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns:'usage',
        modules: false,
        debug: false
      }
    ]
  ],
  plugins: [
     "polyfillsPlugin"
  ]
}
```

**设置 `useBuiltIns: 'usage'`  
依赖@babel/polyfill 不需要显式 import,会根据代码中用到的新语法按需添加 polyfill,适合开发网页 应用等
但比如用`async`函数没有或者`import(abc.js)`未显示调用 Promise，则不会注入 Promise 的 polyfill，所以需要靠自用的 babel 插件"polyfillsPlugin"来实现先把`config.polyfills`的事先强制打包
**

## modernBuild 模式

``` js
{
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns:false,
        targets:{
           esmodules:true
        },
        modules: false,
        debug: false
      }
    ]
  ],
  plugins: [
     []
  ]
}
```

**设置
``` js
 {
    useBuiltIns:false,
    targets:{
        esmodules:true
    },
  }  
```
不会加入 polyfill**