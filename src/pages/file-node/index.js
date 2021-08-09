import { createElement, useEffect, lazy } from 'react';

const FileNode = (props) => {
  const { node } = props;
  /**
   * [Module methods](https://webpack.js.org/api/module-methods/)
   * the import() must contain at least some information about where the module
   * is located.
   */
  const component = lazy(() => import(`src/pages${node.url}/index.js`));
  useEffect(() => {
    if (node.title) {
      document.title = node.title;
    }
  }, [node]);
  return createElement(component, null, null);
};

export { FileNode };
