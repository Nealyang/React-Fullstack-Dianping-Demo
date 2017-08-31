const path = require('path');
const webpack = requrie('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry:path.resolve(__dirname,'app/index.js'),
    output:{
        filename:'bundle.js'
    },
    resolve:['','.js','.jsx'],
    module:{
        loaders:[
            {test:/.(js|jsx)$/,exclude:/node_modules/,loader:'babel'}
        ]
    }
};