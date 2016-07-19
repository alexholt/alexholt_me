const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const precss = require('precss');
const Webpack = require('webpack');

const config = {
  entry: {
    'app': './src/index.jsx',
  },
  output: {
    path: __dirname + '/public',
    filename: '/[name].js?h=[hash]'
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
      test: /\.md$/,
      loader: 'html!markdown'
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html'),
      path: path.resolve('./public'),
      filename: 'index.html',
    }),
    new Webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
};

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8080;
  
  config.devServer = {
    contentBase: __dirname + '/public',
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
  
  config.plugins = [ new Webpack.HotModuleReplacementPlugin() ];
  
  config.devtool = 'source-map';
  config.debug = true;
}

module.exports = config;
