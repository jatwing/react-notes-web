import { createElement, useEffect } from 'react';

const LeafNodePage = (props) => {
  const { component, title, ...otherProps } = props;

  useEffect(() => {
    document.title = !!title && title !== '/' ? title : 'React Notes';
  }, [title]);

  return createElement(component, otherProps, null);
};

export { LeafNodePage }


