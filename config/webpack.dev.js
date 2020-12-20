'use strict';

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './document/webpack/index.js',
        search: './document/webpack/search.js'
    },
    output: {
        //============ 文件指纹如何生成 ==========
        //[hash]：和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会更改
        //[chunkhash]：和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值
        //[contenthash]：根据文件内容来定义hash，文件内容不变，则contenthash不变

        //============ JS文件指纹设置 ===========
        //[hash]：模块标识符(module identifier)的 hash
        //[chunkhash]：chunk 内容的 hash
        //[name]：模块名称
        //[id]：模块标识符(module identifier)
        //[query]：模块的 query，例如，文件名 ? 后面的字符串
        filename: "[name]_[hash].js",
        path: path.join(__dirname, 'dist')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    //style-loader 将css样式插入到行内
                    //和MiniCssExtractPlugin功能冲突
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        //=========== 图片的文件指纹设置 ==========
                        //[ext]：资源后缀名
                        //[name]：文件名称
                        //[path]：文件的相对路径
                        //[folder]：文件所在的文件夹
                        //[contenthash]：文件的内容hash，默认是md5生成
                        //[hash]：文件内容的hash，默认是md5生成
                        //[emoji]：一个随机的指代文件内容的emoji
                        options: {
                            //取前八位
                            name: 'img/[name][hash:8].[ext]',
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //=========== CSS的文件指纹设置 ============
        //MiniCssExtractPlugin 将css样式提取成文件
        //和style-loader功能冲突
        // new MiniCssExtractPlugin({
        //     filename: '[name][contenthash].css'
        // })
        //动态删除 output目录
        new CleanWebpackPlugin()
    ],
    //webpack 可以监听文件变化，当它们修改后会重新编译。
    //默认 false，也就是不开启
    watch: false,
    //只有开启监听模式时，watchOptions才有意识
    watchOptions: {
        //默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        //监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout: 300,
        //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
        poll: 1000
    },
    devServer: {
        contentBase: './dist',
        hot: true
    }
};



