const express = require('express');
const pathLib = require('path');
const config = require('./config/config');
const resData = require('./serverData/resData');
let app = express();

app.use('/',require('connect-history-api-fallback')());
app.use('/',express.static(pathLib.resolve(__dirname,'..','build')));
/**
 * 获取广告数据
 */
app.get('/api/getAdData',function (req,res) {
    res.status(200).send(resData.adData);
});

if(process.env.NODE_ENV !== 'production'){//开发环境下
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.dev');
    const webpackCompiled = webpack(webpackConfig);

    //配置运行时打包
    const webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(webpackCompiled,{
        publicPath:'/',//必填项，由于index.html请求的buildxxx.js存放的位置映射到服务器的URI路径是根
        stats: {colors: true},//console统计日志带颜色输出
        lazy: false,//懒人加载模式。true表示不监控源码修改状态，收到请求才执行webpack的build。false表示监控源码状态，配套使用的watchOptions可以设置与之相关的参数。
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    }));

    // 配置热更新
    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(webpackCompiled));
}

const server = app.listen(config.hotReloadPort,function () {
    let port = server.address().port;
    console.log(`Open http://${config.hotReloadHost}:%s`, port);
});