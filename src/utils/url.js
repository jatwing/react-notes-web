import { pagePaths } from './preval';

/**
 * tree helper functions
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

/**
 * path tree, url tree and item tree helper functions
 */

const getUrls = (paths) => {
  const urls = JSON.parse(JSON.stringify(paths));
  const modifyNode = (node) => {
    node.url = node.path.substring(9) || '/';
    const hasDirectoryPath = node.pathType === 'directory';
    let hasChildWithDirectoryPath = false;
    let hasChildWithIndexFilename = false;
    node.children.forEach((child) => {
      if (child.pathType === 'directory') {
        hasChildWithDirectoryPath = true;
      }
      if (child.filename === 'index.js') {
        hasChildWithIndexFilename = true;
      }
    });
    if (!hasDirectoryPath) {
      node.urlType = 'file';
      node.children = null;
    }
    if (hasChildWithDirectoryPath) {
      if (hasChildWithIndexFilename) {
        node.urlType = null;
        node.children = null;
      } else {
        node.urlType = 'directory';
      }
    } else {
      if (hasChildWithIndexFilename) {
        node.urlType = 'file';
        node.children = null;
      } else {
        node.urlType = null;
        node.children = null;
      }
    }
  };
  traverse(urls, modifyNode);
  return urls;
};

const getItems = (urls) => {
  const items = JSON.parse(JSON.stringify(urls));
  const modifyNode = (node) => {
    if (node.urlType === 'directory') {
      node.type = 'list'
    } else if (node.urlType === 'file') {
      node.type = 'item'
    }
    node.name = node.filename
    node.href = node.url;
  }
  traverse(items, modifyNode)
  return items;
}

/**
 * helper variables
 */
export const pageUrls = getUrls(pagePaths);
export const pageItems = getItems(pageUrls);
