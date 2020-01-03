import { Configuration, ConfigurationFactory } from 'webpack';
import getProjectConfig from './utils/get-project-config';
import merge from 'webpack-merge';
import WebpackUserScript from 'webpack-userscript';
import { DEV_PORT } from "./constants";

const COMMON_CONFIG: Configuration = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
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
          baseUrl: `http://localhost:${ DEV_PORT }`,
          enable: args.mode === 'development',
        },
        headers,
      })
    ]
  };

  return merge(COMMON_CONFIG, OUTPUT, userScriptPlugin, webpackConfig);
};

export default COMMON_CONFIG_PROVIDER;
