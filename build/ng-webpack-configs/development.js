/* eslint-disable @typescript-eslint/no-var-requires */
const provider = require('./common');

module.exports = (project) => ({
  ...provider(project, { dev: true }),
  devServer: {
    writeToDisk: true,
    injectHot: false,
    inline: false,
    compress: true,
  },
});
