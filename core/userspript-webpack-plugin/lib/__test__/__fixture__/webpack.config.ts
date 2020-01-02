import { Configuration } from 'webpack';
import { resolve } from 'path';
import UserScriptWebpackPlugin from '../../index';

const webpackConfig: Configuration = {
  entry: resolve(__dirname, 'index.js'),
  output: {
    path: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          UserScriptWebpackPlugin.loader,
        ],
      }
    ]
  },
  plugins: [new UserScriptWebpackPlugin()],
};

export default webpackConfig;
