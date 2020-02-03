/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, join } = require('path');
const { existsSync } = require('fs');
const WebpackUserscript = require('webpack-userscript');

const FILE_URL = join('file://', resolve('dist'));
const HTTP_URL = 'http://localhost:4200/webpack-dev-server/';

module.exports = function provider(project, { dev = false } = {}) {
  const projectDir = resolve(`projects/${ project }`);
  const headersPath = join(projectDir, 'headers.json');
  const pkgPath = join(projectDir, 'package.json');
  const headers = existsSync(headersPath) ? require(headersPath) : {};
  const pkg = require(pkgPath);
  const baseUrl = process.env.FILE_PROTOCOL ? FILE_URL : HTTP_URL;

  return {
    output: {
      filename: `${ project }${ dev ? '.dev' : '' }.user.js`,
    },
    plugins: [
      new WebpackUserscript({
        metajs: false,
        proxyScript: {
          baseUrl,
          enable: dev,
        },
        headers: { ...headers, license: pkg.license },
      }),
    ],
  }
};
