import React from 'react';
import Link from 'components/link';
import { ImageList, ImageListItem,   Box, Card, Typography } from '@material-ui/core';
import useMedia from 'utils/media';
import { getSubsubtrees } from 'utils/directory-tree';
import useStyles from './styles';
import { useTheme } from '@material-ui/core/styles';
import { cx } from '@emotion/css';

const TreeCard = ({ tree, modifier }) => {
  const theme = useTheme();
  return (
    <Card className={useStyles(theme, 'root')}>
      <Box className={useStyles(theme, 'header')}>
        <Link href={tree.path} className={cx('link ', modifier)}>
          <Box className={cx('row ', modifier)}>
            <Typography className="text">
              {tree.parent === '/' ? 'home' : tree.parent}
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box className={useStyles(theme, 'content')}>
        {tree.children.map((child) => (
          <Link href={tree.directory + child} key={child} className="link">
            <Box className={cx('row ', modifier)}>
              <Typography className="text">{child}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Card>
  );
};

const ParentNode = ({ subtree, subtrees }) => {
  const nonLeaves = subtrees.filter((tree) => tree.children.length > 0);
  const subsubtrees = getSubsubtrees(subtree, nonLeaves);
  const majorCard = <TreeCard tree={subtree} modifier="major" />;
  const minorCards = subsubtrees.map((subsubtree) => (
    <TreeCard tree={subsubtree} modifier="minor" />
  ));

  const { isSmall, isMedium, isLarge } = useMedia();
  return (
    <ImageList variant="masonry"  cols={3} gap={16}>
      {majorCard}
      {minorCards}
      {minorCards}
      {minorCards}
      {minorCards}
      {minorCards}
    </ImageList>
  );
};

export default ParentNode;
