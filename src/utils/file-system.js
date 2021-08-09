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

const getDirectoryNodes = () => {
  const nodes = [];
  const addNode = (node) => {
    nodes.push(node);
  };
  traverse(pageTree, null, addNode);
  const isDirectory = (node) => {
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
  return nodes.filter(isDirectory);
};
const directoryNodes = getDirectoryNodes();

const getFileNodes = () => {
  const nodes = [];
  const addNode = (node) => {
    nodes.push(node);
  };
  traverse(pageTree, addNode);
  nodes.forEach((node) => {
    const results = node.path.match(/^src\/pages\/(.+)\/index.js$/);
    if (results) {
      node.route = results[1];
    }
  });
  return nodes;
};
const fileNodes = getFileNodes();

export { directoryNodes, fileNodes };
