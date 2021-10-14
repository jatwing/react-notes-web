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
  const isIndexFile = (node) => /^index.(js|jsx|ts|tsx)$/.test(node.filename);
  traverse(pageItemTree, (node) => {
    node.url = node.path.substring(9) || '/';
    if (node.pathType === 'directory') {
      if (node.children.some((child) => child.pathType === 'directory')) {
        node.type = 'list';


        /**
         * or we can do it here,
         * it must have index.js child only,
         * but may be its  children deleted by preval have redux/slice.js
         * the content should be [slice.js, ..., index.js]
         */


      } else if (node.children.some(isIndexFile)) {
        node.type = 'item';
        node.content = node.children.find(isIndexFile).content;
      } else {
        node.type = null;
        node.children = null;
      }
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
      codes[node.url] = node.content;
    }
  });
  return codes;
};

export const pageItemTree = getPageItemTree(pageFileTree);
export const pageItemUrls = getPageItemUrls(pageItemTree);
export const pageItemCodes = getPageItemCodes(pageItemTree);
