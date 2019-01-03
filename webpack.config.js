const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
       path: path.join(__dirname, '/bundle'),
       filename: 'index_bundle.js'
    },
    devServer: {
       inline: true,
       port: 8080
    },
    module:{
        rules:[{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader'
        },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
              test: /\.scss$/,
              use: [
                  "style-loader", // creates style nodes from JS strings
                  "css-loader", // translates CSS into CommonJS
                  "sass-loader" // compiles Sass to CSS, using Node Sass by default
              ]
          },
      ]
    },
    plugins:[
       new HtmlWebpackPlugin({
          template: './index.html'
       })
    ]
}
