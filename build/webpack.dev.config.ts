import { Configuration, ConfigurationFactory } from 'webpack';
import COMMON_CONFIG_PROVIDER from './webpack.common.config';
import merge from 'webpack-merge';
import { resolve } from 'path';

const DEV_CONFIG: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 9000,
    contentBase: resolve(process.cwd(), 'dist'),
    writeToDisk: true,
    injectHot: false,
    inline: false,
  },
};

const DEV_CONFIG_PROVIDER: ConfigurationFactory = async (env, args) => {
  const commonConfig = await COMMON_CONFIG_PROVIDER(env, args);

  return merge(commonConfig, DEV_CONFIG);
};

export default DEV_CONFIG_PROVIDER;
