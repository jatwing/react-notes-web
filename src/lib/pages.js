import { pagePathTree } from './preval';

/** tree */
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

/** convert path tree into url tree */
const getUrlTree = (pathTree) => {
  const urlTree = JSON.parse(JSON.stringify(pathTree));
  traverse(urlTree, (node) => {
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
  });
  return urlTree;
};

/** convert url tree into item tree */
const getItemTree = (urlTree) => {
  const itemTree = JSON.parse(JSON.stringify(urlTree));
  traverse(itemTree, (node) => {
    if (node.urlType === 'directory') {
      node.type = 'list';
    } else if (node.urlType === 'file') {
      node.type = 'item';
    }
    node.href = node.url;
  });
  return itemTree;
};

const getItemsUrls = (itemTree) => {
  const urls = [];
  traverse(itemTree, (node) => {
    if (node.type === 'item') {
      urls.push(node.url);
    }
  });
  return urls;
};

export const pageUrlTree = getUrlTree(pagePathTree);
export const pageItemTree = getItemTree(pageUrlTree);
export const pageItemsUrls = getItemsUrls(pageItemTree);
