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
        exclude: resolve(__dirname, 'src/styles/main.scss'),
        use: [
          'to-string-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: resolve(__dirname, 'src/styles/main.scss'),
        use: [
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
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
    ],
  }
};

export default CONFIG;
