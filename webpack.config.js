const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

module.exports = {
    mode: "development",
    entry: "./src/script/first.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "script/bundle.js"
    },
}