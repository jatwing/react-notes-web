import preval from 'preval.macro';

export const buildDate = preval`
  const date = new Date();

  module.exports = {
    date: date.toDateString(),
    time: date.toTimeString(),
  }
`;


export const pageTree = preval`
  const { statSync, readdirSync } = require('fs');
  const { join } = require('path');

  const getNode = (name, path) => {
    /** file */
    if (!statSync(path).isDirectory()) {
      if (name !== 'index.js') {
        return null;
      }
      return { name, type: 'file', path, url: path.substring(9) };
    }
    /** directory */
    const childNames = readdirSync(path);
    const node = {
      name,
      type: 'directory',
      path,
      url: path.substring(9) || '/',
      children: [],
    };
    const excludedPaths = [
      'src/pages/directory-node',
      'src/pages/file-node',
      'src/pages/index.js',
    ];
    childNames.forEach((childName) => {
      const childPath = path + '/' + childName;
      if (excludedPaths.includes(childPath)) {
        return;
      }
      const child = getNode(childName, childPath, node);
      child && node.children.push(child);
    });
    if (node.children.length === 0) {
      return null;
    }
    return node;
  };

  module.exports = getNode('src/pages', 'src/pages');
`;
