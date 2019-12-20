import { ConfigurationFactory } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import PROD_CONFIG_PROVIDER from './webpack.prod.config';

const ANALYZER_CONFIG_PROVIDER: ConfigurationFactory = async (env, args) => {
  const prodConfig = await PROD_CONFIG_PROVIDER(env, args);

  return merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  });
};

export default ANALYZER_CONFIG_PROVIDER;
