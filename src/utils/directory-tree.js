/**
 * @param {string} fullPath
 * @return {!Array<string>}
 */
const getNodes = (fullPath) => {
  if (fullPath === '/') {
    return ['/'];
  }
  return ['/'].concat(fullPath.substring(1).split('/'));
};

/**
 * @param {string} fullPath
 * @param {string} node
 * @return {string}
 */
const getPath = (fullPath, node) => {
  const length = fullPath.indexOf(node) + node.length;
  return fullPath.substring(0, length);
};

/**
 * @param {string} fullPath
 * @param {!Object<string, {parent: string, children: Set<string>}>} subtrees
 */
const createSubtrees = (fullPath, subtrees) => {
  const nodes = getNodes(fullPath);
  nodes.forEach((node, index) => {
    const path = getPath(fullPath, node);
    if (!(path in subtrees)) {
      subtrees[path] = {
        parent: node,
        children: new Set(),
      };
    }
    if (index < nodes.length - 1) {
      subtrees[path]['children'].add(nodes[index + 1]);
    }
  });
};

/**
 * @param {Array<string>} paths
 * @return {Array<{path: string, parent: string, children: Array<string>}>}
 */
const getSubtrees = (fullPaths) => {
  /** @type { !Object<string, {parent: string, children: Set<string>}>} */
  const subtrees = {};
  fullPaths.forEach((fullPath) => {
    createSubtrees(fullPath, subtrees);
  });
  return Object.keys(subtrees).map((key) => ({
    path: key,
    directory: key === '/' ? '/' : key + '/',
    parent: subtrees[key]['parent'],
    children: Array.from(subtrees[key]['children']),
  }));
};

/**
 * @param {Array<{path: string, parent: string, children: Array<string>}>}
 * @param {{path: string, parent: string, children: Array<string>}}
 * @return {Array<{path: string, parent: string, children: Array<string>}>}
 */
const getSubsubtrees = (subtree, subtrees) => {
  const subsubtrees = [];
  subtree.children.forEach((child) => {
    const subsubtree = subtrees.find((subtree) => child === subtree.parent);
    if (subsubtree) {
      subsubtrees.push(subsubtree);
    }
  });
  return subsubtrees;
};

export { getNodes, getPath, getSubtrees, getSubsubtrees };
