/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');

exports.default = {
  config(cfg) {
    const strategy = merge.strategy({
      devtool: 'replace',
    });

    return strategy(cfg, {
      devtool: 'eval',
    });
  },
};
