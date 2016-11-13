var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

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
    ]
  },
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
