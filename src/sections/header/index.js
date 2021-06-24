import React from 'react';

import { useLocation } from 'react-router-dom';
import Link from 'components/link';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { getNodes ,getPath} from 'utils/directory-tree'

import useStyles from './styles';
import useMedia from 'utils/media';
import { useTheme } from '@material-ui/core/styles';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';


const rootAlias = "TODO"


const Header = () => {
  const { pathname } = useLocation();
  const nodes = getNodes(pathname);

  /*
   * can that be more abstract?
   */

  let internalNodes = ["/"]
  let leaf = null;

  if (nodes.length > 1) {
   leaf = nodes.pop();
    internalNodes = nodes;
  }


  const { isSmall, isMedium, isLarge } = useMedia();

  const rootElement = (
    <Link href="/" key={'/'} className="link">
      {rootAlias}
    </Link>
  );

  const internalNodeElements = internalNodes.map((i) => (
    <Link href={getPath(pathname, i)} key={i} className="link">
      {i}
    </Link>
  ));

  const leafElement = leaf && <Typography className="title">{leaf}</Typography>;
  const ellipsisElement = <ArrowBackIosRoundedIcon className="icon"  />
  const elements = [rootElement, ...internalNodeElements, leafElement];

  let maximum = 1;
  if (isMedium) {
    maximum = 2;
  } else if (isLarge) {
    maximum = 3;
  }
  const hasEllipsis = maximum + 1 < elements.length;

  const theme = useTheme()
  return (
    <AppBar  position="sticky" >
      <Toolbar className={useStyles(theme, "toolbar")} >
        {hasEllipsis && ellipsisElement}
        {hasEllipsis ? elements.slice(-maximum) : elements}
      </Toolbar>
    </AppBar>
  );
};


export default Header;
