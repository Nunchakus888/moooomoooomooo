var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: [ 'PhantomJS' ],

    singleRun: true,

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'tests.webpack.js'
    ],

    plugins: [
        'karma-mocha',
        'karma-webpack',
        'karma-sourcemap-loader',
        'karma-mocha-reporter',
        'karma-phantomjs-launcher',
        'karma-chai',
        'karma-sinon',
        'karma-chai-sinon',
        'karma-coverage',
        'istanbul-instrumenter-loader'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots', 'mocha', 'coverage'],

    webpack: {
      devtool: 'inline-source-map',
      module: {
       loaders: [
         { test: /\.js$/,  loader: 'babel-loader', exclude: /node_modules/ },
         { test: /\.scss|\.css$/, loaders: ['style', 'css', 'postcss', 'sass'] },
         { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'}
       ],
       postLoaders: [ { //delays coverage til after tests are run, fixing transpiled source coverage error
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'istanbul-instrumenter' } ]
     },
     externals: {
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
    },

    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'html', //produces a html document after code is run
      dir: 'coverage/' //path to created html doc
    }

  });
};
