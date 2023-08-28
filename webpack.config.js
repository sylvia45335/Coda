const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const port = process.env.PORT || 3002;

module.exports = {
  devtool: 'eval-source-map',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'dist.js',
  },
  mode: 'development',
  devServer: {
    host: 'localhost',
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, '/dist'),
      publicPath: '/api',
    },
    proxy: {
      '/api': `http://localhost:${port}/`
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html'
    }),
    new DotenvWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: /images/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
