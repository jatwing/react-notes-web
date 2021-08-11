import { pageTree } from './preval';

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

const fixTree = (tree) => {
  const addChildrenParent = (node) => {
    if (!node.children) {
      return;
    }
    node.children.forEach((child) => {
      child.parent = node;
    });
  };
  traverse(tree, null, addChildrenParent);
};

const getSemanticDirectoryNodes = (tree) => {
  const nodes = [];
  const addNode = (node) => {
    nodes.push(node);
  };
  traverse(tree, null, addNode);
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

const getSemanticFileNodes = (tree) => {
  const nodes = [];
  const addNode = (node) => {
    nodes.push(node);
  };
  traverse(tree, null, addNode);
  const isSemanticFile = (node) => {
    if (node.type !== 'directory' || node.children.length === 0) {
      return false;
    }
    let hasIndexChild = false;
    node.children.forEach((child) => {
      if (child.type === 'directory') {
        return false;
      }
      if (child.name === 'index.js') {
        hasIndexChild = true;
      }
    });
    return hasIndexChild;
  };
  return nodes.filter(isSemanticFile);
};

const findNode = (tree, evaluate) => {
  let result;
  const find = (node) => {
    if (evaluate(node)) {
      result = node;
    }
  };
  traverse(tree, find, find);
  return result;
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

const getAncestors = (node) => {
  const nodes = [];
  const addParentNode = (node) => {
    nodes.push(node.parent);
  };
  reverse(node, null, addParentNode);
  return nodes;
};

/**
 * context
 */
fixTree(pageTree);
const directoryNodes = getSemanticDirectoryNodes(pageTree);
const fileNodes = getSemanticFileNodes(pageTree);

export { directoryNodes, fileNodes, findNode, getAncestors };
