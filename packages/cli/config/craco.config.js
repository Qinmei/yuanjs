const path = require('path');

module.exports = {
  plugins: [],
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://code.qinmei.org:7001',
        secure: false,
        changeOrigin: true,
      },
    },
    port: 2333,
  },
};
