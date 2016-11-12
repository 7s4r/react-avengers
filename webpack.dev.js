var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'eval-source-map',
  debug: true,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src'
  ],
  output: {
    filename: 'js/bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ExtractTextPlugin('css/[name].css?[hash]', {
      allChunks: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint'
      },
      {
        test: /\.jsx$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
      },
      {
        test: /\.json/,
        loader: 'json'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url'
      }
    ]
  },
  postcss: [autoprefixer],
  devServer: {
    contentBase: './src',
    hot: true,
    inline: true,
    colors: true,
    progress: true,
    profile: true,
    watch: true,
    historyApiFallback: true
  }
}
