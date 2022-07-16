const webpack = require('webpack');
const webpackConfig = require('./webpack/webpack.config');
const fs = require('fs');
const path = require('path');
const packages = fs.readdirSync(path.resolve(__dirname, '../packages/'));

const args = process.argv.slice(2);

const mapPackages = () => {
  const packageWebpackConfig = {};

  packages.forEach(item => {
    let packagePath = path.resolve(__dirname, '../packages/', item);
    const { name, noWebpack } = require(path.resolve(
      packagePath,
      'package.json'
    ));

    if (noWebpack) return;

    packageWebpackConfig[item] = {
      path: packagePath,
      name,
    };
  });
  return packageWebpackConfig;
};

function build(configs) {
  // 遍历执行配置项
  configs.forEach(config => {
    webpack(webpackConfig(config), (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(
        stats.toString({
          chunks: false, // 使构建过程更静默无输出
          colors: true, // 在控制台展示颜色
        })
      );
      if (stats.hasErrors()) {
        return;
      }
      console.log(`${config.name} build successed!`);
    });
  });
}

console.log('\n===> running build');

const configs = Object.values(mapPackages());
const buildConfig = args.length
  ? configs.filter(item => args.some(ele => new RegExp(ele).test(item.name)))
  : configs;

// 执行配置
build(buildConfig);
