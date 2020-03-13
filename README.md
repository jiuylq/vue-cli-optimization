# vue-cli2升级webpack4和Babel

## 前奏

1、安装webpack4需要安装`webpack-cli`， 因为新版本将命令行相关的东西单独拆了出去封装成了`webpack-cli` 。

``` bash
# 全局安装
npm install webpack-cli -g

# 局部安装
npm install webpack-cli -D

#升级webpack到最新版
npm i -D webpack@latest
```

2、升级所需的依赖

``` bash
# npm outdated 可以列出所需要更新的依赖
npm outdated
```

``` bash
#升级webpack-dev-server
npm install --save-dev webpack-dev-server@latest

# 升级vue-loader
npm install --save-dev vue-loader@latest

#升级html-webpack-plugin
npm install --save-dev html-webpack-plugin@latest

#不一定需要升级vue-style-loader和css-loader
npm install --save-dev vue-style-loader@latest
npm install --save-dev css-loader@latest

#如报eslin错误还需要升级eslint-loader
npm install --save-dev eslint-loader@latest

```

3.安装新依赖包

**注意 webpack@4 不支持提取css文件的extract-text-webpack-plugin插件 更换成 mini-css-extract-plugin**

```bash
npm i -D mini-css-extract-plugin
```

* [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)   帮助压缩 css 还能优化代码 ，貌似vue-cli2默认已经配置好了 

## 配置

1、配置`mode`

##### mode: 'development'

- 自动通过 DefinePlugin 设 process.env.NODE_ENV 的值为 development
- 自动开启 NamedChunksPlugin（固定 chunk id） 和 NamedModulesPlugin（开启 HMR 的时候使用该插件会显示模块的相对路径）

```javascript
// webpack.dev.conf.js
module.exports = {
+ mode: 'development'
- devtool: 'eval',
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.NamedChunksPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

##### mode: 'production'

- 自动通过 DefinePlugin 设 process.env.NODE_ENV 的值为 production
- 自动开启 FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin，TerserPlugin

```javascript
// webpack.prod.conf.js
module.exports = {
+  mode: 'production',
-  plugins: [
-    new UglifyJsPlugin(/* ... */),
-    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-    new webpack.optimize.ModuleConcatenationPlugin(),
-    new webpack.NoEmitOnErrorsPlugin()
-	 new webpack.optimize.CommonsChunkPlugin()
-	 new webpack.optimize.ModuleConcatenationPlugin()
-	 new OptimizeCSSPlugin()
-  ]
}
```

> DefinePlugin 允许创建一个在编译时可以配置的全局常量。 在此处设置可以全局访问的环境变量 process.env.NODE_ENV，以便做相应不同的操作 。

所谓的“零配置”就是通过设置mode，自动配置两个环境通常需要做的操作。



2、配置`optimization`

```javascript
// webpack.prod.conf.js 添加以下配置
optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: config.build.productionSourceMap,
        uglifyOptions: {
          warnings: false
        }
      }),
      new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    ],
    concatenateModules: true,
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
```

3、` vue-loader v15 `

```javascript
// webpack.base.config.js
// const vueLoaderConfig = require('./vue-loader.conf')
const { VueLoaderPlugin } = require('vue-loader')

module: {
    rules: [
        ...(config.dev.useEslint ? [createLintingRule()] : []),
        {
            test: /\.vue$/,
            loader: 'vue-loader'
            // options: vueLoaderConfig
        },
	]
}
// 添加以下规则，貌似直接在dev.config和prod.config文件中添加以下规则也可以，不修改base.config文件
module.exports = {
  // ...
    plugins: [
        new VueLoaderPlugin()
    ]
}
```

4、配置 `mini-csss-extract-plugin `

```javascript
// utils.js
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
...
// 找到:
 if (options.extract) {
-       return ExtractTextPlugin.extract({
-         use: loaders,
-         fallback: 'vue-style-loader'
-       })
+      return [MiniCssExtractPlugin.loader].concat(loaders)
  } else {
     return ['vue-style-loader'].concat(loaders)
  }
// 或直接将上面的替换成以下
 return [options.extract ? 
    MiniCssExtractPlugin.loader : 
    'vue-style-loader'
 ].concat(loaders)
// 网上有写说会出现路劲问题，以下给出个解决办法，请自己斟酌使用
 return [
   options.extract ? {
       loader: MiniCssExtractPlugin.loader,
       options: {
        publicPath: '../../'
       }
   } : 'vue-style-loader',
 ].concat(loaders)

// webpack.prod.conf.js
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
用MiniCssExtractPlugin替换ExtractTextPlugin
```

## 升级Babel

### 1. 版本升级

```
# 不安装到本地而是直接运行命令，npm 的新功能
npx babel-upgrade --write

# 或者常规方式
npm i babel-upgrade -g
babel-upgrade --write

# 更新 babel 配置 并且 安装依赖
npx babel-upgrade --write --install
复制代码
```

### 2. 配置文件

这里区分需不需要编译 `node_modules` 里面的依赖。
 如果需要，删除项目根目录下 `.babelrc` 改为使用 `babel.config.js`

### 3. polyfill

1. 推荐使用 `@babel/preset-env` 并按需引入 `polyfill`
   babel 7: `@babel/polyfill`
   babel 6: `babel-polyfill`

2. `Promise`等ES6语法，在 Android 4.4以下 和 IE 的兼容问题

   ```
   // node 环境
   require('@babel/polyfill')
   
   // ES6 main.js
   import('@babel/polyfill')
   
   // webpack.base.config.js
   entry: ['@babel/polyfill', 'main.js']
   ```



参考：

[Vue-CLI2项目从 babel 6 + webpack 3.x 升级到 babel7 + webpack4.x 踩坑]( https://juejin.im/post/5cb878c76fb9a068864218c0#heading-12 )

[9102年 Webpack4 升级]( https://juejin.im/post/5de4cdeee51d4540a15879f0#heading-3 )

[手摸手，带你用合理的姿势使用webpack4（上）]( https://juejin.im/post/5b56909a518825195f499806#heading-4 )

[手摸手，带你用合理的姿势使用webpack4（下）]( https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc#heading-0 )

[vue-cli中的webpack4一步到位填坑记]( https://juejin.im/post/5b4ca3a5e51d4519596b7a06#heading-11 )

[vue-cli webpack 项目版本升级]( https://juejin.im/post/5c95f9c56fb9a070b96f0f44#heading-0 )

[vue-cli2.X构建项目升级webpack4的爬坑记录]( https://zhuanlan.zhihu.com/p/96410822 )

[基于vue-cli2.0，webpack3升级为webpack4的踩坑之旅以及优化]( https://www.jianshu.com/p/879517859fc3 )

[在vue-cli的基础上升级webpack4]( https://www.jianshu.com/p/540e7924af1f )

[webpack官网]( https://webpack.docschina.org/ )