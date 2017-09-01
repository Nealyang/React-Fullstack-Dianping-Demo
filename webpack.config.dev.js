const pathLib = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const OpenBrowser = require('open-browser-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            pathLib.resolve(__dirname, 'app', 'index.js')
        ],
        vendor: ['react']
    },
    output: {
        path: pathLib.resolve(__dirname, 'build'),
        publicPath: "/",
        filename: '[name]-[hash:8].js'
    },
    devtool:'source-map',
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
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
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
        new HtmlWebpackPlugin({
            title: "My app",
            showErrors: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()//保证出错时页面不阻塞，且会在编译结束后报错
    ],
    resolve: {
        extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx']
    }
};