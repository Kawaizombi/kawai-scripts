import { Configuration } from 'webpack';
import commonConfigFactory from './common';
import webpackMerge from 'webpack-merge';

const developmentConfigFactory = (): Configuration => {
  const DEV_CONFIG: Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      inline: false,
      injectHot: false,
      writeToDisk: true,
    },
  };

  return webpackMerge(commonConfigFactory(), DEV_CONFIG);
};

export default developmentConfigFactory;
