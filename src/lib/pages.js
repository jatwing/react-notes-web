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
      node.urlType = null;
      node.children = null;
    } else if (hasChildWithDirectoryPath) {
      /** ignore potential index.js file */
      node.urlType = 'directory';
    } else if (hasChildWithIndexFilename) {
      node.urlType = 'file';
      node.content = node.children.find(child => child.filename === 'index.js').content;
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

/**
 * suggested names for re-rewrite
 *  - getPageFiles (tree indeed)
 *  - getpageItems (tree indeed)
 *  - getPageUrlsAndCodes ([], {})
 *
 * the helper url tree to be deleted
 *
 * test child index file should used regex, similar to preval
 */

const getItemsUrlsAndCodes = (itemTree) => {
  const urlsAndCodes = {}
  traverse(itemTree, (node) => {
    if (node.type === 'item') {
      urlsAndCodes[node.url] = node.content
    }
  });
  return urlsAndCodes;
};

export const pageUrlTree = getUrlTree(pagePathTree);
export const pageItemTree = getItemTree(pageUrlTree);
export const pageItemsUrlsAndCodes = getItemsUrlsAndCodes(pageItemTree);
