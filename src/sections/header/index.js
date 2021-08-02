import React from 'react';
import { useLocation } from 'react-router-dom';
import Link from 'components/link';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { getNodes, getPath } from 'utils/directory-tree';
import useStyles from './styles';
import { useMedia } from 'utils/media';
import { useTheme } from '@material-ui/core/styles';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const Header = () => {
  const { pathname } = useLocation();
  const nodes = getNodes(pathname);
  const parentNodes = nodes.slice(0, -1);
  const leafNode = nodes[nodes.length - 1];

  const theme = useTheme();
  const { isMedium, isLarge } = useMedia(theme);
  /**
   * maximum number of parent nodes.
   * @type {number}
   */
  let maximum = 1;
  if (isMedium) {
    maximum = 2;
  } else if (isLarge) {
    maximum = 3;
  }
  const isVisible = maximum < parentNodes.length;
  const startIndex = -maximum + (isVisible && 1);
  const backNode =
    nodes.length - 1 - maximum >= 0 ? nodes[nodes.length - 1 - maximum] : '/';

  const classes = useStyles();

  const backIcon = (
    <Link
      href={getPath(pathname, backNode)}
      key={backNode}
      className={classes.link}
    >
      <ArrowBackIosRoundedIcon />
    </Link>
  );
  const parentElements = parentNodes.map((node) => (
    <Link href={getPath(pathname, node)} key={node} className={classes.link}>
      {node === '/' ? 'home' : node}
    </Link>
  ));
  const leafElement = leafNode && (
    <Typography className={classes.title}>
      {leafNode === '/' ? 'home' : leafNode}
    </Typography>
  );

  return (
    <AppBar position="sticky" className={classes.container}>
      <Toolbar className={classes.toolbar}>
        {isVisible && backIcon}
        {startIndex < 0 && parentElements.slice(startIndex)}
        {leafElement}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
