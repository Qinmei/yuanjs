const fs = require('fs');
const path = require('path');
const { appPath } = require('../config/paths');

const getFilePath = (...pathname) => path.resolve(__dirname, ...pathname);

const copyTemplateFile = dir => {
  const files = fs.readdirSync(getFilePath(dir));
  try {
    files.forEach(file => {
      fs.copyFileSync(getFilePath(dir, file), path.resolve(appPath, file));
    });
  } catch (error) {
    console.log('当前项目已经存在配置项，请删除后再初始化');
  }
};

copyTemplateFile('../template');
