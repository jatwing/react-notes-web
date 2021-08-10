import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Link } from 'src/components';
import { findNode, getAncestors, pageTree, useMedia } from 'src/utils';

import { useStyles } from './styles';

const Header = () => {
  const { pathname } = useLocation();
  const findByUrl = (node) => node.url === pathname;
  const node = findNode(pageTree, findByUrl);

  const { t } = useTranslation();
  const classes = useStyles();
  if (!node) {
    return (
      <AppBar position="sticky">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title}>{t('error')}</Typography>;
        </Toolbar>
      </AppBar>
    );
  }

  const ancestors = getAncestors(node);
  const theme = useTheme();
  const { isMedium, isLarge } = useMedia(theme);
  /**
   * maximum number of ancestors.
   * @type {number}
   */
  let maximum = 1;
  if (isMedium) {
    maximum = 2;
  } else if (isLarge) {
    maximum = 3;
  }
  const isArrowVisible = maximum < ancestors.length;
  const firstAncestorIndex = isArrowVisible
    ? ancestors.length - (maximum - 1)
    : 0;

  const arrowBack = isArrowVisible ? (
    <Link href={ancestors[firstAncestorIndex - 1].url} className={classes.link}>
      <ArrowBackIosRoundedIcon />
    </Link>
  ) : (
    <></>
  );
  const ancestorElements = ancestors
    .map((ancestor) => (
      <Link href={ancestor.url} key={ancestor.url} className={classes.link}>
        {ancestor.name === 'src/pages' ? t('home') : ancestor.name}
      </Link>
    ))
    .slice(firstAncestorIndex);
  const nodeElement = (
    <Typography className={classes.title}>
      {node.name === 'src/pages' ? t('home') : node.name}
    </Typography>
  );

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        {arrowBack}
        {ancestorElements}
        {nodeElement}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
