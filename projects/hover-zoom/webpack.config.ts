import { resolve } from 'path';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import { Configuration } from 'webpack';

const CONFIG: Configuration = {
  entry: resolve(__dirname),

  resolve: {
    plugins: [
      new TsConfigPathsPlugin({ configFileName: resolve(__dirname, 'tsconfig.json') }),
    ],
  },
};

export default CONFIG;
