const path = require('path');
const fs = require('fs');

const projectRoot = fs.realpathSync(process.cwd());

const resolveScriptsFilePath = fileName => {
  return require.resolve(path.join('@craco/craco', 'scripts', fileName), {
    paths: [projectRoot],
  });
};

module.exports = {
    resolveScriptsFilePath
};