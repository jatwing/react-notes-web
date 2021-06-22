import React from "react"
import Link from 'components/link';
import {
  Box,
  Card,
  Typography,
  ImageList,
  ImageListItem,
  Slider,
} from '@material-ui/core';

// import useStyles from './styles';
import clsx from 'clsx';
import useMedia from 'utils/media';
import root from './style';
import { jsx, css } from '@emotion/react';

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

const ParentNode = ({ subtree, subsubtrees }) => {
  const classes = {};

  const style = css`
    color: hotpink;
  `;

  return (
    <>
      <div css={style}>
        test root
        <Box
          className="test1"
          css={css`
            color: #fff;
          `}
        >
          test 1
        </Box>
        <Box className="test2">test 2</Box>
      </div>

      <Box sx={{ width: 300 }}>
        <Slider defaultValue={30} />
        <Slider
          defaultValue={30}
          css={css`
            color: #ff00ff;
          `}
        />
      </Box>

      <TreeCard tree={subtree} modifier="major" />

      {subsubtrees.map((t) => (
        <TreeCard tree={t} modifier="minor" />
      ))}
    </>
  );
};

export default ParentNode;
