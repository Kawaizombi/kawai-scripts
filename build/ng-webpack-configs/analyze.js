/* eslint-disable @typescript-eslint/no-var-requires */
const provider = require('./production');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (project) => {
  const cfg = provider(project);
  const analyzerPlugin = new BundleAnalyzerPlugin({
    analyzerMode: 'static',
  });

  return { ...cfg, plugins: [...cfg.plugins, analyzerPlugin] };
};
