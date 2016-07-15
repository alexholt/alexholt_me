const autoprefixer = require('autoprefixer');
const sassImporter = require("node-sass-importer");
const path = require('path');
const precss = require('precss');
const Webpack = require('webpack');

const config = {
  entry: {
    'app': './src/index.jsx',
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel',
      include: path.resolve('./src')
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: path.resolve('./src')
    }, {
      test: /\.scss$/,
      loader: 'style?singleton!css!postcss!sass'
    }, {
      test: /\.css$/,
      loader: 'style!css?sourceMap'
    }, {
      test: /\.(ico|png|jpg|gif)$/,
      loader: 'url?name=images/img-[hash:6].[ext]'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'svg-inline'
    }]
  },
  babel: {
    presets: ['es2015', 'react', 'stage-0']
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  postcss: function () {
    return [precss, autoprefixer];
  },
  sassConfig: {
    importer: sassImporter, 
  },
};

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8080;
  
  config.devServer = {
    contentBase: './public',
    host: 'localhost',
    port,
    publicPath: '/',
    hot: true,
    historyApiFallback: true
  };
  
  // Add the hot loader file to all the entry points
  const entries = Object.keys(config.entry);
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    config.entry[entry] = [ config.entry[entry], 'webpack/hot/only-dev-server' ];
  }
  
  const devServer = `webpack-dev-server/client?http://localhost:${port}`;
  config.entry['dev-server-client'] = devServer;
  
  config.plugins = [ new Webpack.HotModuleReplacementPlugin()];
  
  config.devtool = 'source-map';
  config.debug = true;
}

module.exports = config;
