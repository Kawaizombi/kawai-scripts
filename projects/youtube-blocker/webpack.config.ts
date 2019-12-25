import { resolve } from 'path';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import { Configuration } from 'webpack';

const CONFIG: Configuration = {
  entry: resolve(__dirname, 'src/index.ts'),

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
      {
        test: /\.s[ac]ss$/i,
        use: [
          'to-string-loader',
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ],
  }
};

export default CONFIG;
