import { pageFileTree } from './preval';

/** tree */
export const traverse = (node, callback = null) => {
  if (!node) {
    return;
  }
  if (callback) {
    callback(node);
  }
  node?.children?.forEach((child) => {
    traverse(child, callback);
  });
};

const getPageItemTree = (pageFileTree) => {
  const pageItemTree = JSON.parse(JSON.stringify(pageFileTree));
  traverse(pageItemTree, (node) => {
    node.url = node.path.substring(9) || '/';
    if (node.pathType !== 'directory') {
      node.type = null;
      node.codes = null;
      node.children = null;
    } else if (node.children.some((child) => child.isIndexFile)) {
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
        node.codes.push(
          node.children.find((child) => child.isIndexFile).content
        );
      }
      node.children = null;
    } else if (node.children.some((child) => child.pathType === 'directory')) {
      node.type = 'list';
      node.codes = null;
    }
  });
  return pageItemTree;
};

export const getPageItemUrls = (pageItemTree) => {
  const urls = [];
  traverse(pageItemTree, (node) => {
    if (node.type === 'item') {
      urls.push(node.url);
    }
  });
  return urls;
};

export const getPageItemCodes = (pageItemTree) => {
  const codes = {};
  traverse(pageItemTree, (node) => {
    if (node.type === 'item') {
      codes[node.url] = node.codes;
    }
  });
  return codes;
};

export const pageItemTree = getPageItemTree(pageFileTree);
export const pageItemUrls = getPageItemUrls(pageItemTree);
export const pageItemCodes = getPageItemCodes(pageItemTree);
