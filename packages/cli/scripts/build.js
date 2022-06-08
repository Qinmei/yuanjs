const webpack = require('webpack');

const webpackConfig = require('../config/webpack.config');

function build() {
  console.log(__dirname);
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(
      stats.toString({
        chunks: false,
        colors: true,
      })
    );
    if (stats.hasErrors()) {
      return;
    }
    console.log(`build successed!`);
  });
}

console.log('\n===> running build');

build();
