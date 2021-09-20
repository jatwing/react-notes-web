const { statSync, readdirSync } = require('fs');
const { join } = require('path');
const getPaths = (filename, path, excludedPaths) => {
  /** file */
  if (!statSync(path).isDirectory()) {
    if (filename !== 'index.js') {
      return null;
    }
    return { filename, path, pathType: 'file' };
  }
  /** directory */
  const directory = {
    filename,
    path,
    pathType: 'directory',
    children: [],
  };
  readdirSync(path).forEach((childFilename) => {
    const childPath = path + '/' + childFilename;
    if (excludedPaths.includes(childPath)) {
      return;
    }
    const child = getPaths(childFilename, childPath, excludedPaths);
    child && directory.children.push(child);
  });
  if (directory.children.length === 0) {
    return null;
  }
  return directory;
};
module.exports = getPaths('src/pages', 'src/pages', ['src/pages/file-node']);
