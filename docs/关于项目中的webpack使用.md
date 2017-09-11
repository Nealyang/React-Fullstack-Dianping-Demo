# React技术栈实现大众点评Demo-项目配置说明

>[项目地址](https://github.com/Nealyang/React-Fullstack-Dianping-Demo)

>关于什么是webpack什么是babel这里就不做过多的介绍了。直接解释下项目中的配置项，安装插件的作用吧


## 项目截图
![首页](https://github.com/Nealyang/React-Fullstack-Dianping-Demo/blob/master/record/home_1.jpg)



##项目中babel配置说明

.babelrc

    {
      "presets": ["es2015","react","stage-0","env"],
      "plugins": [
        "react-hot-loader/babel"
      ],
      "env": {
        "production":{
          "preset":["react-optimize"]
        }
      }
    }
    
虽然这部分可以放到webpack中配置，但是我依旧喜欢把.babelrc文件单独的拿出来

### 安装的插件列表

    "babel-core": 如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块
    "babel-loader": webpack打包时候调用,
    "babel-plugin-react-transform": 转换react 组件,
    "babel-plugin-transform-remove-console": 打包时候删除调试用的console语句,
    "babel-polyfill": Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API ，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码.所以babel-polyfill就要用上了。该项目主要是因为saga的使用
    "babel-preset-env": 可以根据配置的目标运行环境（environment）自动启用需要的 babel 插件,
    "babel-preset-es2015": 转换es6，因为浏览器兼容性的问题,
    "babel-preset-react": react转码规则,
    "babel-preset-react-hmre": react热更新,
    "babel-react-optimize":自动去除propTypes
    "babel-preset-stage-0": ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个,
    "babel-register": 模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。,
    "babel-runtime": 是为了减少重复代码而生的。 babel生成的代码，可能会用到一些_extend()， classCallCheck() 之类的工具函数，默认情况下，这些工具函数的代码会包含在编译后的文件中。如果存在多个文件，那每个文件都有可能含有一份重复的代码。,
    
    
##webpack的配置说明

    const pathLib = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack');
    const OpenBrowser = require('open-browser-webpack-plugin');
    const ExtractText = require('extract-text-webpack-plugin');
    const CleanPlugin = require('clean-webpack-plugin');
    const ProgressBarPlugin = require('progress-bar-webpack-plugin');
    const config = require('./config/config');
    module.exports = {
        entry: {
            index: [
                'babel-polyfill',
                'react-hot-loader/patch',
                'webpack-hot-middleware/client?path=http://localhost:8000/__webpack_hmr',
                pathLib.resolve(__dirname,'frontWeb', 'index.js')
            ],
            vendor: ['react','react-dom','react-router-dom','redux','react-redux','redux-saga','swipe-js-iso','react-swipe','react-addons-pure-render-mixin']
        },
        output: {
            path: pathLib.resolve(__dirname, 'build'),
            publicPath: "/",
            filename: '[name].[hash:8].js'
        },
        devtool:'eval-source-map',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use:ExtractText.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    localIdentName: '[path][name]-[local]-[hash:base64:5]',
                                    importLoaders: 1
                                }
                            },
                            'postcss-loader'
                        ]
                    })
                },
                {
                    test:/\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
                    exclude:/node_modules/,
                    use:[
                        {
                            loader:'url-loader',
                            options: {
                                limit:8192
                            }
                        }
                        ]
                },
                {
                    test: /\.(eot|woff|ttf|woff2|svg)$/,
                    use: 'url-loader'
                }
            ]
        },
        plugins: [
            new CleanPlugin(['build']),
            new ProgressBarPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.DefinePlugin({
               "progress.env.NODE_ENV":JSON.stringify('development')
            }),
            new HtmlWebpackPlugin({
                title: "My app",
                showErrors: true,
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),//保证出错时页面不阻塞，且会在编译结束后报错
            new ExtractText({
                filename:'bundle.[contenthash].css',
                disable:false,
                allChunks:true
            }),
            new OpenBrowser({url:`http://${config.hotReloadHost}:${config.hotReloadPort}`}),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "manifest"
            })
        ],
        resolve: {
            extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx']
        }
    };

都是一些比较常规的配置，其中需要说明的是，热更新这里需要配置一个服务器，也就是这个项目中的hotReloadServer.js

其中，打包的时候，output当存在热更新的时候，输出文件名不能使用chunkhash