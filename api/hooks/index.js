const webpack = require('webpack');
const merge = require('webpack-merge');
const historyFallback = require('connect-history-api-fallback');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
module.exports = function (sails) {
  if (!sails.config.webpack) {
    return {};
  }
  return {
    defaults: sails.config.webpack,
    configure () {
      let compiler = webpack(this.defaults.options);
      switch (process.env.NODE_ENV) {
        case 'development':
          sails.config.http.middleware.historyFallback = historyFallback();
          sails.config.http.middleware.webpackDev = webpackDev(compiler, this.defaults.devServer);
          sails.config.http.middleware.webpackHot = webpackHot(compiler, this.defaults.hot);
          let index = sails.config.http.middleware.order.findIndex(el => el === 'router' ? el : undefined);
          sails.config.http.middleware.order.splice(index + 1, 0, 'historyFallback', 'webpackDev', 'webpackHot');
          break;
        case 'production':
          break;
      }
    },
    initialize (cb) {
      return cb();
    }
  }
};
