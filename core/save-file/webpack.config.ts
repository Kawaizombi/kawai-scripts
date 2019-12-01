import { resolve } from 'path';
import { Configuration } from 'webpack';

const CONFIG: Configuration = {
  entry: resolve(__dirname, 'index.ts'),
  mode: 'production',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'save-file.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
};

export default CONFIG;
