import { createElement, lazy, useEffect } from 'react';

const FileNode = (props) => {
  const { node } = props;
  /**
   * [Module methods](https://webpack.js.org/api/module-methods/)
   * the import() must contain at least some information about where the module
   * is located.
   */
  const component = lazy(() => import(`src/pages${node.url}/index.js`));
  useEffect(() => {
    if (node.name) {
      document.title = node.name;
    }
  }, [node]);
  return createElement(component, null, null);
};

export { FileNode };
