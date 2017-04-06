var webpack = require('webpack');
var HappyPack = require('happypack')
var ignore = new webpack.IgnorePlugin(/\.svg$/)

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      './scripts/main.js'
    ],
  },
  output: {
    filename: '/js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loaders: ['happypack/loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss|\.css$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      }
    ],
  },
  plugins: [ignore,
  new HappyPack({
    // loaders is the only required parameter:
    loaders: [ 'babel?presets[]=es2015' ],

    // customize as needed, see Configuration below
  })],
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api/*': 'http://localhost:8081',
    },
    historyApiFallback: true,
    inline: true,
  },
};
