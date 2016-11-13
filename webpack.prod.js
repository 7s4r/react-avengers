var webpack = require("webpack")
var path = require('path')

module.exports = {
  devtool: 'source-map',
  resolve: {
    root: './',
    extensions: ['', '.js', '.jsx'],
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
    ]
  },
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
