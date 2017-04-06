var path = require('path');
var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin(/\.svg$/);
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HappyPack = require("happypack")
module.exports = {
  entry: {
    main: './scripts/main.js',
    vendor: [
      'lodash',
      'moment',
      'normalizr',
      'react',
      'redux',
      'soundcloud',
    ],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].[hash].js',
  },

  module: {
    loaders: [
      //load js.
      {
         test: /\.js$/,
         loader: ['happypack/loader'],
         query: {
           presets: ['es2015', 'react'],
           plugins: ['transform-runtime'],
         },
         exclude: [nodeModulesDir]
       },

       //load scss.
      {
        test: /\.scss|\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
       },
       { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'}

    ],
  },

  plugins: [
    ignore,
    new ExtractTextPlugin('./css/main.[hash].css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', './js/vendor.[hash].js'),
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      {from: 'fonts/*'}
    ]),
    new HappyPack({
       // loaders is the only required parameter:
       loaders: [ 'babel?presets[]=es2015' ],

       // customize as needed, see Configuration below
     })

  ],
};
