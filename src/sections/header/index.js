import { useLocation } from 'react-router-dom';
import Link from 'components/link';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import classNameHelper from 'utils/class-name-helper';
import style from './style.module.css';
import { rootAlias, getNodes, getPath } from 'utils/path-helper';

import useMedia from 'utils/media';

const cls = classNameHelper(style);

import classes from './styles';

const Header = () => {
  const { pathname } = useLocation();
  const [internalNodes, leaf] = getNodes(pathname);

  const { isSmall, isMedium, isLarge } = useMedia();

  const rootElement = (
    <Typography variant="h6" className={cls('title', 'lighter')}>
      <Link
        href="/"
        color="inherit"
        key={'/'}
        className={cls('title', 'lighter')}
      >
        {rootAlias}
      </Link>
    </Typography>
  );
  const internalNodeElements = internalNodes.map((i) => (
    <Typography variant="h6">
      <Link
        href={getPath(pathname, i)}
        color="inherit"
        key={i}
        className={cls('title', 'lighter')}
      >
        {i}
      </Link>
    </Typography>
  ));

  const leafElement = leaf && (
    <Typography variant="h6" color="inherit" className={cls('title', 'bolder')}>
      {leaf}
    </Typography>
  );
  const ellipsisElement = (
    <Typography variant="h6" color="inherit" className={cls('title', 'bolder')}>
      ...
    </Typography>
  );

  const elements = [rootElement, ...internalNodeElements, leafElement];

  let maximum = 1;
  if (isMedium) {
    maximum = 2;
  } else if (isLarge) {
    maximum = 3;
  }
  const hasEllipsis = maximum + 1 < elements.length;

  return (
    <AppBar color="primary" position="sticky" className={cls('app-bar')}>
      <Toolbar css={classes}>
        {hasEllipsis && ellipsisElement}
        {hasEllipsis ? elements.slice(-maximum) : elements}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
