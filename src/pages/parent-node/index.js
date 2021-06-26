import React from 'react';
import Link from 'components/link';
import {
  ImageList,
  ImageListItem,
  Box,
  Card,
  Typography,
  Grid
} from '@material-ui/core';
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
        <Link href={tree.path} className={cx('link', modifier)}>
          <Box className={cx('row', modifier)}>
            <Typography className="text">
              {tree.parent === '/' ? 'home' : tree.parent}
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box className={useStyles(theme, 'content')}>
        {tree.children.map((child) => (
          <Link href={tree.directory + child} key={child} className="link">
            <Box className={cx('row', modifier)}>
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
  const majorCard = (
    <ImageListItem className={cx('item', 'test')}>
      <TreeCard tree={subtree} modifier="major" />
    </ImageListItem>
  );
  const minorCards = subsubtrees.map((subsubtree) => (
    <ImageListItem className="item">
      <TreeCard tree={subsubtree} modifier="minor" />
    </ImageListItem>
  ));

  const theme = useTheme();

  // the real name is root of this component : parent node,
  // TODO rename

  const listStyles = useStyles(theme, 'list');
  const { isSmall, isMedium, isLarge } = useMedia();
  const cols = isSmall ? 1 : 2;
  const gap = theme.spacing(2);

  if (isLarge) {
    return (
      <Box className={listStyles}>
        {majorCard}
        <Box className="left">test</Box>
        <Box className="right">
          <ImageList
            variant="masonry"
            cols={2}
            gap={'16px'}
            className={"list"}
          >
            {minorCards}
            {minorCards}
            {minorCards}
            {minorCards}
            {minorCards}
          </ImageList>
        </Box>
      </Box>
    );
  } else if (isSmall || isMedium) {
    return (
      <Box className={listStyles}>
        <ImageList variant="masonry" cols={cols} gap={theme.spacing(2)} className="list">
          {majorCard}
          {minorCards}
          {minorCards}
          {minorCards}
          {minorCards}
          {minorCards}
        </ImageList>
      </Box>
    );
  }
  return <></>
};

export default ParentNode;
