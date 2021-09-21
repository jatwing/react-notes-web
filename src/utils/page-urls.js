import { pagePaths } from './preval';

/**
 * tree
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

export const reverse = (node, callback = null) => {
  if (!node) {
    return;
  }
  callback && callback(node);
  if (!node.parent) {
    return;
  }
  reverse(node.parent, callback);
};

export const fix = (tree) => {
  const modify = (node) => {
    if (!node.children) {
      return;
    }
    node?.children.forEach((child) => {
      child.parent = node;
    });
  };
  traverse(tree, modify);
};

/**
 * path tree, url tree and item tree
 */
const getUrls = (paths) => {
  const urls = JSON.parse(JSON.stringify(paths));
  const modify = (node) => {
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
    } else if (hasChildWithDirectoryPath) {
      /** ignore potential index.js file */
      node.urlType = 'directory';
    } else if (hasChildWithIndexFilename) {
      node.urlType = 'file';
      node.children = null;
    } else {
      node.urlType = null;
      node.children = null;
    }
  };
  traverse(urls, modify);
  return urls;
};

const getItems = (urls) => {
  const items = JSON.parse(JSON.stringify(urls));
  const modify = (node) => {
    if (node.urlType === 'directory') {
      node.type = 'list';
    } else if (node.urlType === 'file') {
      node.type = 'item';
    }
    node.name = node.filename;
    node.href = node.url;
  };
  traverse(items, modify);
  return items;
};

export const pageUrls = getUrls(pagePaths);
export const pageItems = getItems(pageUrls);
