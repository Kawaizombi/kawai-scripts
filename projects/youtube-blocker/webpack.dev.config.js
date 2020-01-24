/* eslint-disable @typescript-eslint/no-var-requires */
const commonConfigProvider = require('./webpack.common.config');

module.exports = {
  devServer: {
    writeToDisk: true,
    injectHot: false,
    inline: false,
    compress: true,
  },
  ...commonConfigProvider({ dev: true }),
};
