const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugins = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_bundle.js',
    publicPath: '',
  },
  devServer: {
    contentBase: 'dist',
    host: 'localhost',
    port: 9000,
    stats: {
      colors: true,
    },
    overlay: {
      errors: true,
      warnings: false,
    },
    compress: false,
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            // resolves require() on a file into a url and emits  file into the output
            loader: 'file-loader',
            options: {
              name: '[name].html',
            },
          },
          {
            // keep file separate from the main bundle
            loader: 'extract-loader',
          },
          {
            // exports HTML as string.
            loader: 'html-loader',
            options: {
              minimize: false,
              // for images, target the attribute src in img tag
              attrs: ['img:src'],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: 'style-loader',
          },
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
          },
          {
            // compiles Less to CSS
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            // render images
            query: {
              inlineRequires: '/img/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HTMLWebpackPlugins({
      template: './src/index.hbs',
      // variables
      title: 'Hello Webpack',
      header: 'Hello Webpack.',
    }),
  ],
};
