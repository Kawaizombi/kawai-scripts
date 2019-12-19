import { resolve } from 'path';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import { Configuration } from 'webpack';

const CONFIG: Configuration = {
  entry: resolve(__dirname),

  resolve: {
    plugins: [
      new TsConfigPathsPlugin({ configFileName: resolve(__dirname, 'tsconfig.json') }),
    ],
    alias: {
      '@angular': resolve(__dirname, './node_modules/@angular'),
      rxjs: resolve(__dirname, './node_modules/rxjs'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'angular2-template-loader',
      },
    ],
  }
};

export default CONFIG;
