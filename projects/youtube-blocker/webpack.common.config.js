/* eslint-disable @typescript-eslint/no-var-requires */
const headers = require('./headers');
const { license } = require('./package');
const WebpackUserscript = require('webpack-userscript');

module.exports = ({ dev = false } = {}) => ({
  output: {
    filename: `youtube-blocker${ dev ? '.dev' : '' }.user.js`,
  },
  plugins: [
    new WebpackUserscript({
      metajs: false,
      proxyScript: {
        baseUrl: 'http://localhost:4200',
        enable: dev,
      },
      headers: { ...headers, license },
    }),
  ],
});
