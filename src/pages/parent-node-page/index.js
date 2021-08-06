import { ImageList, ImageListItem } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useEffect } from 'react';
import { MultirowTextCard } from 'src/components';
import { useReadingProject } from 'src/hooks';
import { getSubsubtrees, useMedia } from 'src/utils';

import { useStyles } from './styles';

const ParentNodePage = (props) => {
  const { subtree, subtrees, title } = props;
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

  const nonLeaves = subtrees.filter((tree) => tree.children.length > 0);
  const subsubtrees = getSubsubtrees(subtree, nonLeaves);
  const getData = (tree) => ({
    header: {
      text: tree.parent,
      href: tree.path,
    },
    content: tree.children.map((child) => ({
      text: child,
      href: tree.directory + child,
    })),
  });

  const theme = useTheme();
  const classes = useStyles();
  const { isMedium, isLarge } = useMedia(theme);
  let cols = 1;
  if (isMedium) {
    cols = 2;
  } else if (isLarge) {
    cols = 3;
  }
  return (
    <ImageList
      variant="masonry"
      cols={cols}
      gap={parseFloat(theme.spacing(2))}
      className={classes.list}
    >
      <ImageListItem
        key={subtree.path}
        className={clsx(classes.card, classes.major)}
      >
        <MultirowTextCard data={getData(subtree)} modifier="gradient" />
      </ImageListItem>
      {subsubtrees.map((subsubtree) => (
        <ImageListItem key={subsubtree.path} className={classes.card}>
          <MultirowTextCard data={getData(subsubtree)} modifier="default" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export { ParentNodePage };
