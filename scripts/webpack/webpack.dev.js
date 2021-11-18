const path = require("path");

module.exports = (opt) => {
  return {
    mode: "development",
    entry: path.resolve(opt.path, "./src/index.ts"),
    output: {
      filename: "index.js",
      path: path.resolve(opt.path, "./lib"),
      clean: true,
      libraryTarget: "umd",
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: ["babel-loader", "ts-loader"],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", "..."],
    },
    externals: ["react", "antd"],
  };
};
