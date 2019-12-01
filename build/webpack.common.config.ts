import { Configuration, ConfigurationFactory } from 'webpack';
import getProjectConfig from './utils/get-project-config';
import merge from 'webpack-merge';
import WebpackUserScript from 'webpack-userscript';
import { version } from '../projects/hover-zoom/package.json';

const COMMON_CONFIG: Configuration = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },

  plugins: [],
};

const COMMON_CONFIG_PROVIDER: ConfigurationFactory = (env, args) => {
  const { webpackConfig, headers } = getProjectConfig(env, args);
  const filename = args.mode === 'development' ? `${ args['project'] }.dev.user.js` : `${ args['project'] }.user.js`;

  const OUTPUT: Configuration = {
    output: { filename },
  };

  const userScriptPlugin: Configuration = {
    plugins: [
      new WebpackUserScript({
        metajs: false,
        proxyScript: {
          enable: false,
        },
        headers,
      })
    ]
  };

  return merge(COMMON_CONFIG, OUTPUT, userScriptPlugin, webpackConfig);
};

export default COMMON_CONFIG_PROVIDER;
