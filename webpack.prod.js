var webpack = require("webpack")
var path = require('path')
var autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'source-map',
  resolve: {
    root: './',
    extensions: ['', '.js', '.jsx', '.scss', '.json'],
    modulesDirectories: ['src', 'node_modules']
  },
  entry: [
    './src'
  ],
  output: {
    path: path.resolve(__dirname, './public/js/'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.jsx/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!postcss!sass?sourceMap'
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
