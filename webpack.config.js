'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('deepmerge');
const path = require('path');

const sourceFolders = [
    path.join(__dirname, 'tasks')
];

//envirnoment env.mode = 'prod'|'dev'

module.exports = function (env) {
    let config = {
        entry: {
            'batman': 'batman/batman.js'
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].js',
            library: '[name]'
        },
        resolve: {
            modules: sourceFolders
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader', //Why loader instead of use?
                    include: sourceFolders,
                    options: {
                        presets: [
                            ['es2015', {"modules": false}], //this is es2015 preset with options
                        ],
                        plugins: [
                            "transform-object-rest-spread",
                            "transform-class-properties"
                            // ["transform-object-rest-spread", { "useBuiltIns": true }]
                        ]
                    }
                },
                {
                    test: /\.scss$/,
                    include: sourceFolders,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        }, "sass-loader"]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("[name].css"),
            new CopyWebpackPlugin([
                {from: './tasks/batman/batman.html'},
                {from: './tasks/batman/img/*', to: './batman-resources', flatten: true}
            ])
        ]
    };

    let debugConfig = {
        devtool: 'source-map',
        //debug: true, //TODO https://webpack.js.org/guides/migrating/#debug
        output: {
            pathinfo: true
        }
    };

    let productionConfig = {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                comments: false
            })
        ]
    };

    let arrayMerge = function (destArray, sourceArray, options) {
        return destArray.concat(sourceArray);
    };

    if (env && env.mode === 'prod') {
        return merge(config, productionConfig, {arrayMerge: arrayMerge});
    } else
        return merge(config, debugConfig, {arrayMerge: arrayMerge});
};
