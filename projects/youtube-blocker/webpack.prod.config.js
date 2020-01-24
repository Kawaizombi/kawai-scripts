/* eslint-disable @typescript-eslint/no-var-requires */
const commonConfigProvider = require('./webpack.common.config');

module.exports = commonConfigProvider({ dev: false });
