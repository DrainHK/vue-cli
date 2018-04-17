/**
 * Created by hg on 2018/3/29.
 */

var path = require('path');
module.exports = {
    devtool: 'source-map',  //可调试模式
    entry: ['babel-polyfill', './src/main.js'],  //babel-polyfill 解决ie不兼容vuex(es6语法)
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "build.js",
        publicPath: '/build/',
        chunkFilename:'[name]-[hash].js'
    },
    module:{
        rules: [
            {test: /\.css$/, use: ['style-loader','css-loader?sourceMap']},
            {test: /\.less$/, use: ['style-loader','css-loader?sourceMap','less-loader?sourceMap']},
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015']}},
            {test: /.(jpg|png|gif|svg)$/, use: ['url-loader?limit=40000&name=./[name].[ext]']},
            {test: /\.vue$/, use: ['vue-loader']},
            {test: /\.woff/,use: ['url-loader?prefix=font/&limit=100000&mimetype=application/font-woff']},
            {test: /\.ttf/, use: ['file-loader?prefix=font/']},
            {test: /\.eot/, use: ['file-loader?prefix=font/&limit=1000000']}
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, "src"),
            'static': path.resolve(__dirname, "static"),
            'comps': path.resolve(__dirname, 'src/components')
        },
    },
    devServer: {            //解决跨域，在同域名下发送 API 请求
        port: 80,
        disableHostCheck: true,
        proxy: {
            '/liudao-main/a': {         //出接口后修改
                target: 'http://test.keyil.cn',
                changeOrigin: true                       //本地虚拟一个服务端接收请求并发送该请求
            }
        }
    }
};


