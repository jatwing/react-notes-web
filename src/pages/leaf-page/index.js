import { createElement, useEffect } from 'react';
import project from 'config/project';

const LeafPage = (props) => {
  const { component, title, ...otherProps } = props;

  useEffect(() => {
    document.title = !!title && title !== '/' ? title : project.name;
  }, [title]);

  return createElement(component, otherProps, null);
};

export default LeafPage;
