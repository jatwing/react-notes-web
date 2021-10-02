import preval from 'preval.macro';

/**
 * TODO can we obtain the object
 */
export const buildDate = preval`
const date = new Date();
module.exports = {
  date: date.toDateString(),
  time: date.toTimeString(),
}
`;

export const pagePathTree = preval`
const { statSync, readdirSync } = require('fs');
const getPagePathTree = (filename, path) => {
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
    const child = getPagePathTree(childFilename, childPath);
    child && directory.children.push(child);
  });
  if (directory.children.length === 0) {
    return null;
  }
  return directory;
};
module.exports = getPagePathTree('src/pages', 'src/pages');
`;

