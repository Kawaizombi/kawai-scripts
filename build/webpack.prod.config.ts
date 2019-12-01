import { Configuration, ConfigurationFactory } from 'webpack';
import merge from 'webpack-merge';
import COMMON_CONFIG_PROVIDER from './webpack.common.config';

const PROD_CONFIG: Configuration = {
  mode: 'production',
  devtool: false,
};

const PROD_CONFIG_PROVIDER: ConfigurationFactory = async (env, args) => {
  const commonConfig = await COMMON_CONFIG_PROVIDER(env, args);

  return merge(commonConfig, PROD_CONFIG);
};

export default PROD_CONFIG_PROVIDER;
