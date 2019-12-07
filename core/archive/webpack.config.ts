import { resolve } from 'path';
import { Configuration } from 'webpack';

const CONFIG: Configuration = {
  entry: resolve(__dirname, 'index.ts'),
  mode: 'production',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'archive.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
};

export default CONFIG;
