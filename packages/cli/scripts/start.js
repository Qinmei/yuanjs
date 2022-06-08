process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require('path');
const fs = require('fs');

const projectRoot = fs.realpathSync(process.cwd());

const resolveScriptsFilePath = fileName => {
  return require.resolve(path.join('@craco/craco', 'scripts', fileName), {
    paths: [projectRoot],
  });
};

console.log('start', resolveScriptsFilePath, typeof resolveScriptsFilePath);
const res = resolveScriptsFilePath('start.js');

console.log(res);
