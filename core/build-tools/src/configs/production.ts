import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import commonConfigFactory from './common';

const productionConfigFactory = (): Configuration => {
  const PROD_CONFIG: Configuration = {
    mode: 'production',
    devtool: false,
  };

  return webpackMerge(commonConfigFactory(), PROD_CONFIG);
};

export default productionConfigFactory;
