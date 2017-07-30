const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const publicPath = '/';
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports.webpack = {
  // ⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩ options
  options: {
    devtool: 'inline-source-map',
    entry: {
      app: [path.resolve('./src/main.js'), hotMiddlewareScript]
    },
    output: {
      filename: '[name].js',
      path: path.resolve('./dist'),
      publicPath: publicPath
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new CleanWebpackPlugin(['dist'], {
        root: publicPath,
        verbose: true
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('./src/index.html')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: [
            'babel-loader',
          ],
          exclude:[
            path.resolve("./node_modules"),
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        },

      ]
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    }
  },
  // ⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧ options

  // ⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩ devServer
  devServer: {
    quiet: false,
    noInfo: false,
    //lazy: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    publicPath: publicPath,
    stats: {
      colors: true,
      children: false,
      cachedAssets: false,
      chunks: true,
      chunkModules: false,
      errorDetails: false,
      assets: false,
      version: false
    }
  },
  // ⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧ devServer

  // ⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩ hot
  hot: {
    publicPath: publicPath,
    reload: true,
    stats: {colors: true}
  }
  // ⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧ hot

};
