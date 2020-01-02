import { Compiler, Plugin } from 'webpack';
import { ConcatSource } from 'webpack-sources';
import createHeader from './utils/create-header';
import { Config } from './types';

const PLUGIN_NAME = 'UserScriptWebpackPlugin';

class UserScriptWebpackPlugin implements Plugin {
  constructor(
    private config: Config = {},
  ) {
  }

  apply(compiler: Compiler) {
    /*compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, (factory) => {
      factory.hooks.parser.for('javascript/auto').tap(PLUGIN_NAME, (parser) => {
        parser.hooks.importCall.tap(PLUGIN_NAME, (expression) => {
          const { value: resourceName } = expression.arguments[0];
          const node = parse(`GM_getResourceURL('${ resourceName }')`);
        });
      });
    });*/

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.afterOptimizeChunkAssets.tap(PLUGIN_NAME, (chunks) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((file) => {
            const fileSource = compilation.assets[file];
            compilation.assets[file] = new ConcatSource(
              createHeader(this.config.headers),
              '\n',
              fileSource,
            );
          });
        });
      });
    });
  }

  static get loader() {
    return require.resolve('./loader');
  }
}

export default UserScriptWebpackPlugin;
