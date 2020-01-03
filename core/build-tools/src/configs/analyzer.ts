import { Configuration, ConfigurationFactory } from 'webpack';
import webpackMerge from 'webpack-merge';
import productionConfigFactory from './production';

const analyzerConfigFactory: ConfigurationFactory = async () => {
  const ANALYZER_CONFIG: Configuration = {
    mode: 'production',
    devtool: false,
  };

  return webpackMerge(await productionConfigFactory(), ANALYZER_CONFIG);
};

export default analyzerConfigFactory;
