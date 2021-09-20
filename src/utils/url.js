import preval from 'preval.macro';

import { pagePaths } from './preval'
console.log('hree')
console.log(pagePaths);


export const pagePaths2   = preval`
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
      pathType: 'directory',
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



/**
 * helper functions
 */
export const traverse = (node, callback = null) => {
  if (!node) {
    return;
  }
  callback && callback(node);
  /** leaf node */
  if (!(node?.children?.length > 0)) {
    return;
  }
  /** parent node  */
  node.children.forEach((child) => {
    traverse(child, callback);
  });
};


const getUrls = (paths) => {
  const urls = JSON.parse(JSON.stringify(paths));
  const isDirectoryPath = (node) => node.pathType === 'directory';
  const isFileUrl = (node) => {
    let hasChildWithDirectoryPath = false;
    let hasChildWithIndexFilename = false
    node.children.forEach((child) => {
      if (child.pathType === 'directory') {
        hasChildWithDirectoryPath = true;
      }
      if (child.filename === 'index.js') {
        hasChildWithIndexFilename = true;
      }
    });
    if (hasChildWithDirectoryPath) {
      return false;
    }
    if (hasChildWithIndexFilename) {
      return true;
    }
    return null;
  };
  const modifyNode = (node) => {
    node.url = node.path.substring(9) || '/'
    /** directory */
    if (!isFileSystemDirectory(node) || isUrlFile(node) === false) {
      node.urlType = 'directory';
      return;
    }




    node.urlType = isUrlFile(node) === true ? 'file' : 'null';
    node.children = null;
  };

  traverse(pageUrls, modifyNode);

  return pageUrls;
};





const getPageUrls = (pagePaths) => {
  const pageUrls = JSON.parse(JSON.stringify(pagePaths));

  const isFileSystemDirectory = (node) =>
    node.pathType === 'directory' && !!node.children && node.children.length > 0;
  const isUrlFile = (node) => {
    let hasDirectoryFile = false;
    let hasIndexFile = false;
    node.children.forEach((child) => {
      if (child.pathType === 'directory') {
        hasDirectoryFile = true;
      }
      if (child.name === 'index.js') {
        hasIndexFile = true;
      }
    });

    if (hasDirectoryFile) {
      return false;
    }
    if (hasIndexFile) {
      return true;
    }
    return null;
  };
  const modifyNode = (node) => {
    
 //   console.log(isFileSystemDirectory(node) ,isUrlFile(node) ) 
    if (!isFileSystemDirectory(node) || isUrlFile(node) === false) {
      node.urlType =  'directory';
      return;
    }

    node.urlType = isUrlFile(node) === true ? 'file' : 'null';
    node.children = null;
  };

  traverse(pageUrls, modifyNode);

  return pageUrls;
};

const fixTree = (tree) => {
  const addChildrenParent = (node) => {
    if (!node.children) {
      return;
    }
    node.children.forEach((child) => {
      child.parent = node;
    });
  };
  traverse(tree, addChildrenParent);
};

const reverse = (node, anteriorCallback = null, posteriorCallback = null) => {
  anteriorCallback && anteriorCallback(node);
  /** before */
  if (!node.parent) {
    return;
  }
  reverse(node.parent, anteriorCallback, posteriorCallback);
  /** after */
  posteriorCallback && posteriorCallback(node);
};

/**
 * helper function
 */

/**
 * TODO delete the legacy code
 */

export const pageUrls = getPageUrls(pagePaths2);

/** we may need to fix the url tree  */
