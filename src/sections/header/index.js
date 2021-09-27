import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Link } from 'src/components/link';
//import { findNode, getAncestors } from 'src/utils/file-system';
import { useMedia } from 'src/utils/material-ui';
import { pageTree } from 'src/utils/preval';

import { useStyles } from './styles';

const findNode = null;
const getAncestors = null;

export const Header = () => {
  const { pathname } = useLocation();
  const hasIdenticalUrl = (node) => node.url === pathname;
  const node = findNode(pageTree, hasIdenticalUrl);

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const { isMedium, isLarge } = useMedia(theme);

  if (!node) {
    return (
      <AppBar position="sticky">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title}>{t('error')}</Typography>
        </Toolbar>
      </AppBar>
    );
  }

  const ancestors = getAncestors(node);
  const ancestorsMaximumNumber = 1 + (isMedium && 1) + (isLarge && 1);
  const isArrowVisible = ancestorsMaximumNumber < ancestors.length;
  const firstAncestorIndex = isArrowVisible
    ? ancestors.length - (ancestorsMaximumNumber - 1)
    : 0;

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        {isArrowVisible && (
          <Link
            href={ancestors[firstAncestorIndex - 1].url}
            className={classes.link}
          >
            <ArrowBackIosRoundedIcon />
          </Link>
        )}
        {ancestors
          .map((ancestor) => (
            <Link
              href={ancestor.url}
              key={ancestor.url}
              className={classes.link}
            >
              {ancestor.name === 'src/pages' ? t('home') : ancestor.name}
            </Link>
          ))
          .slice(firstAncestorIndex)}
        {
          <Typography className={classes.title}>
            {node.name === 'src/pages' ? t('home') : node.name}
          </Typography>
        }
      </Toolbar>
    </AppBar>
  );
};
