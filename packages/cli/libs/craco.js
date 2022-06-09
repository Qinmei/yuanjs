const path = require('path');
const fs = require('fs');

const projectRoot = fs.realpathSync(process.cwd());

const resolveScriptsFilePath = fileName => {
  console.log(
    'resolve',
    projectRoot,
    path.join('@craco/craco', 'scripts', fileName)
  );
  return require.resolve(path.join('@craco/craco', 'scripts', fileName), {
    paths: [projectRoot],
  });
};

module.exports = {
  resolveScriptsFilePath,
};
