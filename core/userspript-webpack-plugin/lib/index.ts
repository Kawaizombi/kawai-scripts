import webpack, { Compiler, Plugin } from 'webpack';
import Chunk = webpack.compilation.Chunk;
import { ConcatSource } from 'webpack-sources';
import createHeader from './utils/create-header';

const PLUGIN_NAME = 'UserScriptWebpackPlugin';

class UserScriptWebpackPlugin implements Plugin {
  private initialChunks: Chunk[] = [];

  apply(compiler: Compiler){
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.afterOptimizeChunkAssets.tap(PLUGIN_NAME, (chunks) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((file) => {
            const fileSource = compilation.assets[file];
            compilation.assets[file] = new ConcatSource(
              createHeader({
                name: 'Test User script',
                author: 'Me'
              }),
              '\n',
              fileSource,
            );
            console.log(file);
          });
        });
      });
    });
  }
}

export default UserScriptWebpackPlugin;
