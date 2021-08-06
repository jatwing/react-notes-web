import { useReadingProject } from 'hooks';
import { createElement, useEffect } from 'react';

const LeafNodePage = (props) => {
  const { component, title, ...otherProps } = props;
  const { loading, error, data } = useReadingProject('react-notes');

  useEffect(() => {
    if (title && title !== '/') {
      document.title = title;
      return;
    }
    if (loading || error) {
      return;
    }
    document.title = data.Project.title;
  }, [title, loading, error, data]);

  return createElement(component, otherProps, null);
};

export { LeafNodePage };
