const path = require('path');
const autoprefixer = require('autoprefixer');
const ESLintPlugin = require('eslint-webpack-plugin');

const { appPath } = require('./paths');
const babelConfig = require('../babel.config.json');

module.exports = {
  mode: 'production',
  entry: path.resolve(appPath, './src/index'),
  output: {
    filename: 'index.js',
    clean: true,
    path: path.resolve(appPath, './lib'),
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig.env.production,
          },
          {
            loader: 'ts-loader',
            options: {
              context: appPath,
              configFile: path.resolve(__dirname, '../tsconfig.json'),
            },
          },
        ],
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
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      context: appPath,
      extensions: ['ts', 'tsx'],
      eslintPath: require.resolve('eslint'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
  },
  externals: ['react', 'react-dom'],
};
