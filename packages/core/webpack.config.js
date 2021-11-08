const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './lib'),
    clean: true,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
  },
  externals: ['react', 'react-dom', 'antd'],
};
