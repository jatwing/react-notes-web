
/**
 * tree
 */
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
