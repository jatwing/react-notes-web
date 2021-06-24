import React from "react"
import Link from 'components/link';
import {
  Box,
  Card,
  Typography,
} from '@material-ui/core';

// import useStyles from './styles';
import clsx from 'clsx';
import useMedia from 'utils/media';
import { getSubsubtrees} from 'utils/directory-tree'

import root from './style';



const TreeCard = ({ tree, modifier }) => {
  const classes = {};
  const directory = tree.path === '/' ? '/' : tree.path + '/';
  const { isSmall, isMedium, isLarge } = useMedia();
  return (
    <Card className={clsx(classes.root)}>
      <Box className={clsx(classes.header)}>
        <Link href={tree.path} className={clsx(classes.link)}>
          <Box className={clsx(classes.row, classes[modifier])}>
            <Typography className={clsx(classes.text)}>
              {tree.parent}
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box className={clsx(classes.content)}>
        {tree.children.map((c) => (
          <Link href={directory + c} className={clsx(classes.link)}>
            <Box className={clsx(classes.row, classes[modifier])}>
              <Typography className={clsx(classes.text)}>{c}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Card>
  );
};

const ParentNode = ({ subtree, subtrees }) => {
  const subsubtrees = getSubsubtrees(subtree, subtrees)
  const classes = {};


  return (
    <>

      <TreeCard tree={subtree} modifier="major" />

      {subsubtrees.map((t) => (
        <TreeCard tree={t} modifier="minor" />
      ))}
    </>
  );
};

export default ParentNode;
