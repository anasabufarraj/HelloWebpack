const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_bundle.js',
    publicPath: ''
  },
  devServer: {
    contentBase: 'dist',
    host: 'localhost',
    port: 8080,
    overlay: {
      errors: true,
      warnings: true
    },
    compress: false
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            // resolves require() on a file into a url and emits the file into the output
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          {
            // keep file separate from the main bundle
            loader: 'extract-loader'
          },
          {
            // exports HTML as string.
            loader: 'html-loader',
            options: {
              minimize: false,
              // for images, target the attribute src in img tag
              attrs: ['img:src']
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: 'style-loader'
          },
          {
            // translates CSS into CommonJS
            loader: 'css-loader'
          },
          {
            // compiles Less to CSS
            loader: 'less-loader'
          }
        ]
      }
    ]
  }
};