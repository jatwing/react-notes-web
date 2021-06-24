const rootAlias = 'home';

const getNodes = (fullPath) => {
  const path = fullPath.substring(1);
  let internalNodes = [];
  let leaf = '';
  if (path) {
    const nodes = path.split('/');
    internalNodes = nodes.slice(0, -1);
    leaf = nodes.slice(-1)[0];
  }
  return [internalNodes, leaf];
};

const getPath = (fullPath, node) => {
  const length = fullPath.indexOf(node) + node.length;
  return fullPath.substring(0, length);
};

const getSubtrees = (paths) => {
  /*
   * subtrees {
   *   path: {
   *     parent: "",
   *     children: Set,
   *   },
   * }
   */
  const subtrees = {};
  paths.forEach((p) => {
    const [internalNodes, leaf] = getNodes(p);
    if (internalNodes.length > 0 || (internalNodes.length === 0 && leaf)) {
      const path = '/';
      if (!(path in subtrees)) {
        subtrees[path] = {
          parent: rootAlias,
          children: new Set(),
        };
      }
      subtrees[path]['children'].add(internalNodes[0] || leaf);
    }
    internalNodes.forEach((n, i, a) => {
      const path = getPath(p, n);
      if (!(path in subtrees)) {
        subtrees[path] = {
          parent: n,
          children: new Set(),
        };
      }
      if (i < a.length - 1) {
        subtrees[path]['children'].add(a[i + 1]);
      } else {
        subtrees[path]['children'].add(leaf);
      }
    });
  });
  /*
   * subtrees [
   *   {
   *     path: "",
   *     parent: "",
   *     children: [],
   *   },
   * ]
   */
  return Object.keys(subtrees).map((k) => ({
    path: k,
    parent: subtrees[k]['parent'],
    children: Array.from(subtrees[k]['children']),
  }));
};

const getSubsubtrees = (subtree, subtrees) => {
  const subsubtrees = [];
  subtree.children.forEach((c) => {
    const subsubtree = subtrees.find((t) => c === t.parent);
    if (subsubtree) {
      subsubtrees.push(subsubtree);
    }
  });
  return subsubtrees;
};

export { rootAlias, getNodes, getPath, getSubtrees, getSubsubtrees };
