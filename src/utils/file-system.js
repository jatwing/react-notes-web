import { pageTree } from 'src/utils';

const traverse = (node, leafNodeCallback = null, parentNodeCallback = null) => {
  /** leaf node */
  if (!node.children) {
    leafNodeCallback && leafNodeCallback(node);
    return;
  }
  /** parent node */
  parentNodeCallback && parentNodeCallback(node);
  node.children.forEach((child) => {
    traverse(child, leafNodeCallback, parentNodeCallback);
  });
};

const getSemanticDirectoryNodes = () => {
  const nodes = [];
  const addNode = (node) => {
    nodes.push(node);
  };
  traverse(pageTree, null, addNode);
  const isSemanticDirectory = (node) => {
    if (node.type !== 'directory' || node.children.length === 0) {
      return false;
    }
    let hasDirectoryChild = false;
    node.children.forEach((child) => {
      if (child.type === 'directory') {
        hasDirectoryChild = true;
      }
    });
    return hasDirectoryChild;
  };
  return nodes.filter(isSemanticDirectory);
};
const directoryNodes = getSemanticDirectoryNodes();

const getSemanticFileNodes = () => {
  const nodes = [];
  const addNode = (node) => {
    nodes.push(node);
  };
  traverse(pageTree, null, addNode);
  const isSemanticFile = (node) => {
    if (node.type !== 'directory' || node.children.length === 0) {
      return false;
    }
    let hasIndexChild = false;
    node.children.forEach((child) => {
      if (child.type === 'directory') {
        return false
      }
      if (child.name === 'index.js') {
        hasIndexChild = true
      }
    })
    return hasIndexChild;
  };


  /*
  nodes.forEach((node) => {
    const results = node.path.match(/^src\/pages\/(.+)\/index.js$/);
    if (results) {
      node.route = results[1];
    }
  });
  */

  return nodes.filter(isSemanticFile);
};
const fileNodes = getSemanticFileNodes();

export { directoryNodes, fileNodes };
