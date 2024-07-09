const nodeExternals = require('webpack-node-externals');

module.exports = (options) => ({
  ...options,
  externals: [
    nodeExternals({ allowlist: ['@repo/common', '@repo/shared-svc'] }),
  ],
});
