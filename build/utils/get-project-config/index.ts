import { CliConfigOptions, Configuration } from 'webpack';
import { resolve } from 'path';
import { existsSync } from 'fs';

function getPkgHeaders(basePath: string) {
  const {
    version,
    name,
    description,
    author,
    homepage,
    bugs,
  } = require(resolve(basePath, 'package.json'));

  return { version, name, description, author, homepage, bugs };
}

function getScriptHeaders(basePath: string) {
  const path = resolve(basePath, 'headers.json');
  if(existsSync(path)) {
    return require(path);
  }
  return {};
}

export default function getProjectConfig(env, args: CliConfigOptions) {
  const basePath = resolve(process.cwd(), 'projects', args['project']);

  const { default: provider } = require(resolve(basePath, 'webpack.config.ts'));
  const webpackConfig: Configuration = provider instanceof Function ? provider(env, args) : provider;
  const pkgHeaders = getPkgHeaders(basePath);
  const headers = getScriptHeaders(basePath);

  return {
    webpackConfig,
    headers: { ...pkgHeaders, ...headers },
  };
}
