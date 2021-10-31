import { pageFileTree } from './preval';

/** depth first search */
export const traverse = (node, callback, isFalsityPropagated = false) => {
  if (!node || !callback) {
    return;
  }
  /** false literal returned by callback() terminates this function */
  if (callback(node) === false) {
    return false;
  }
  if (!node.children) {
    return;
  }
  for (const child of node.children) {
    /** false literal returned by traverse() terminates this function */
    if (
      traverse(child, callback, isFalsityPropagated) === false &&
      isFalsityPropagated
    ) {
      return false;
    }
  }
};

/** page item tree */
const getPageItemTree = (pageFileTree) => {
  const pageItemTree = JSON.parse(JSON.stringify(pageFileTree));
  traverse(pageItemTree, (node) => {
    if (node.pathType === 'file') {
      node.type = null;
      return false;
    }
    /** node.pathType === 'directory' */
    node.url = /^src\/pages(.*)$/.exec(node.path)[1] || '/';
    if (!node.children.some((child) => child.isIndexFile)) {
      if (node.children.some((child) => child.pathType === 'directory')) {
        node.type = 'list';
        return;
      }
      node.type = null;
      return false;
    }
    /** node.children.some((child) => child.isIndexFile)) */
    if (node.url === '/') {
      node.type = /** tolerant */ 'list';
      node.codes = [node.children.find((child) => child.isIndexFile).content];
      return;
    }
    /** node.url !== '/' */
    node.type = 'item';
    node.codes = [];
    /** add codes of slice files in directory and subdirectory */
    traverse(node, (childNode) => {
      if (childNode.isSliceFile) {
        node.codes.push(childNode.content);
      }
    });
    /** add code of index file in directory */
    if (node.codes.length === 0) {
      node.codes.push(node.children.find((child) => child.isIndexFile).content);
    }
    node.children = null;
    return false;
  });
  return pageItemTree;
};

const getPageItemUrls = (pageItemTree) => {
  const urls = [];
  traverse(pageItemTree, (node) => {
    if (node.type === 'item') {
      urls.push(node.url);
    }
  });
  return urls;
};

export const pageItemTree = getPageItemTree(pageFileTree);
export const pageItemUrls = getPageItemUrls(pageItemTree);
