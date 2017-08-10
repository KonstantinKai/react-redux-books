'use strict';

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const koutoSwiss = require('kouto-swiss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCss = new ExtractTextPlugin('styles.css');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: __dirname + '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: extractCss.extract({
                    use: [
                        'css',
                        {
                            loader: 'postcss',
                            options: {
                                plugins: (loader) => [autoprefixer()],
                                sourceMap: 'inline'
                            }
                        },
                        {
                            loader: 'stylus',
                            options: {
                                use: [koutoSwiss()],
                                import: ['~kouto-swiss/lib/kouto-swiss/index.styl']
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png)$/,
                use: 'file?name=[path][sha512:hash:base64:7].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.styl', '.json']
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new HtmlWebpackPlugin({
            template: 'html!./src/index.html'
        }),
        extractCss
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    }
};