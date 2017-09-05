const pathLib = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const OpenBrowser = require('open-browser-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: [
            pathLib.resolve(__dirname, 'app', 'index.js')
        ],
        vendor: ['react','react-dom','react-router-dom']
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
        new webpack.DefinePlugin({
            "progress.env.NODE_ENV":JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: "My app",
            showErrors: true,
        }),
        new ExtractText({
            filename:'bundle.[contenthash].css',
            disable:false,
            allChunks:true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest"
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                // 在 UglifyJs 删除没有用到的代码时输出警告
                warnings: false,
            },
        }),
    ],
    output: {
        path: pathLib.resolve(__dirname, 'build'),
        publicPath: "/",
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx']
    }
};