const { statSync, readFileSync } = require('fs');
const getFileContent = (path) => {
  if (statSync(path).isFile()) {
    return readFileSync(path, 'utf8');
  }
  return '';
};
module.exports = getFileContent('README.md');
