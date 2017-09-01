const pathLib = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: pathLib.resolve(__dirname, 'app', 'index.js'),
        vendor: ['react']
    },
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
            }
        ]
    },
    output: {
        path: pathLib.resolve(__dirname, 'build'),
        filename: '[name]-[hash:8].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "My app"
        })
    ]
};