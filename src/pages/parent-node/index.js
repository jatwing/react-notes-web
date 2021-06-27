import React from 'react';
import { ImageList, ImageListItem, Box } from '@material-ui/core';
import { useMedia } from 'utils/media';
import { getSubsubtrees } from 'utils/directory-tree';
import useStyles from './styles';
import { useTheme } from '@material-ui/core/styles';
import MultiRowTextCard from 'components/multi-row-text-card';
import clsx from 'clsx';

const ParentNode = ({ subtree, subtrees }) => {
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
  const { isSmall } = useMedia(theme);
  return (
    <Box className={classes.root}>
      <Box className={classes.left} />
      <Box className={classes.right}>
        <ImageList
          variant="masonry"
          cols={isSmall ? 1 : 2}
          gap={theme.spacing(2)}
          className={classes.list}
        >
          <ImageListItem className={clsx(classes.card, classes.major)}>
            <MultiRowTextCard data={getData(subtree)} modifier="major" />
          </ImageListItem>
          {subsubtrees.map((subsubtree) => (
            <ImageListItem className={classes.card}>
              <MultiRowTextCard data={getData(subsubtree)} modifier="minor" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default ParentNode;
