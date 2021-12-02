import { PageFileNode, pageFileTree } from './preval';

type TreeNode = {
  children: null | Array<TreeNode>;
};

/** depth first search */
export const traverse = (
  node: TreeNode,
  callback: (node: any) => void | undefined | false,
  isFalsityPropagated = false,
): void | false => {
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

export type PageItemNodeDraft = PageFileNode & {
  name?: string;
  url?: string;
  type?: null | string;
  codes?: null | ReadonlyArray<string>;
};

export type PageItemNode = Required<PageItemNodeDraft>;

const getPageItemTree = (pageFileTree: null | PageFileNode): PageItemNode => {
  if (!pageFileTree) {
    throw new Error('inexhaustive');
  }
  const pageItemTree = JSON.parse(JSON.stringify(pageFileTree));
  traverse(pageItemTree, (node: PageItemNodeDraft): undefined | false => {
    node.name = node.filename;
    /** url from valid path */
    const result = /^src\/pages(.*)$/.exec(node.path);
    if (!result) {
      throw new Error('inexhaustive');
    }
    node.url = result[1] || '/';
    /** file node */
    if (!node.children) {
      node.type = null;
      node.codes = null;
      return;
    }
    /** four types of directory node */
    const indexChild = node.children.find(
      (child) => child.filename === 'index.tsx',
    );
    if (!indexChild) {
      if (!node.children.some((child) => !!child.children)) {
        node.type = null;
        node.codes = null;
        return false;
      }
      node.type = 'list';
      node.codes = null;
      return;
    }
    if (node.url === '/') {
      node.type = /** tolerant */ 'list';
      node.codes = [indexChild.content as string];
      return;
    }
    node.type = 'item';
    const codes = [];
    /** codes of existed slice.ts files in directory */
    traverse(node, (childNode: PageItemNodeDraft): void => {
      if (childNode.filename === 'slice.ts') {
        codes.push(childNode.content as string);
      }
    });
    /** code of index.tsx file as fallback */
    if (codes.length === 0) {
      codes.push(indexChild.content as string);
    }
    node.codes = codes;
    node.children = /** pruning */ null;
    return false;
  });
  return pageItemTree;
};

export const pageItemTree: PageItemNode = getPageItemTree(pageFileTree);

const getPageItemUrls = (pageItemTree: PageItemNode): ReadonlyArray<string> => {
  const urls: Array<string> = [];
  traverse(pageItemTree, (node: PageItemNode) => {
    if (node.type === 'item') {
      urls.push(node.url);
    }
  });
  return urls;
};

export const pageItemUrls: ReadonlyArray<string> =
  getPageItemUrls(pageItemTree);
