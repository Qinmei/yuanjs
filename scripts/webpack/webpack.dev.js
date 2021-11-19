const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../../examples/index.html'),
  filename: './index.html',
});

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../../examples/index'),
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]-[hash:base64:6]',
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
  },
  devServer: {
    port: 3009,
    host: '0.0.0.0',
  },
};
