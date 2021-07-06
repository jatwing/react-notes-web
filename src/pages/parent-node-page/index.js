import React, { useEffect } from 'react';
import { ImageList, ImageListItem, Box } from '@material-ui/core';
import { useMedia } from 'utils/media';
import { getSubsubtrees } from 'utils/directory-tree';
import useStyles from './styles';
import { useTheme } from '@material-ui/core/styles';
import MultirowTextCard from 'components/multirow-text-card';
import project from 'config/project';
import clsx from 'clsx';

const ParentNodePage = (props) => {
  const { subtree, subtrees, title } = props;

  useEffect(() => {
    document.title = !!title && title !== '/' ? title : project.name;
  }, [title]);

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
    <Box className={classes.container}>
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
    </Box>
  );
};

export default ParentNodePage;
