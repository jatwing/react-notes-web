import { pageFileTree, PageFileNode } from './preval';

type TreeNode = {
  children?: Array<TreeNode>;
};

/** depth first search */
export const traverse = (
  node: TreeNode,
  callback: Function,
  isFalsityPropagated: boolean = false,
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
  type?: null | string;
  url?: string;
  codes?: Array<string>;
};

export type PageItemNode = PageFileNode & {
  type: null | string;
  url: string;
  codes: Array<string>;
};

const getPageItemTree = (pageFileTree: PageFileNode): PageItemNode => {
  const pageItemTree = JSON.parse(JSON.stringify(pageFileTree));
  traverse(pageItemTree, (node: PageItemNodeDraft) => {
    if (node.pathType === 'file') {
      throw new Error('unexhaustive');
    }
    node.url = /^src\/pages(.*)$/.exec(node.path)?.[1] || '/';
    /** node.pathType === 'directory' */
    if (!node.children?.some((child) => child.isIndexFile)) {
      if (node.children?.some((child) => child.pathType === 'directory')) {
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
