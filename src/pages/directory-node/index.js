import { ImageList, ImageListItem } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MultirowTextCard } from 'src/components/multirow-text-card';
import { useProjects } from 'src/redux/projects/hooks';
// import { directoryNodes } from 'src/utils/file-system';
const directoryNodes = null;
import { useMedia } from 'src/utils/material-ui';

import { useStyles } from './styles';

export const DirectoryNode = (props) => {
  const { node } = props;
  const projects = useProjects();

  useEffect(() => {
    if (node.name && node.name !== 'src/pages') {
      document.title = node.name;
      return;
    }
    if (!projects.isSucceed) {
      return;
    }
    document.title = projects.entities[0].title;
  }, [node]);

  const { t } = useTranslation();
  const getSubtree = (node) => ({
    header: {
      text: node.name === 'src/pages' ? t('home') : node.name,
      href: node.url,
    },
    content: node.children.map((child) => ({
      text: child.name,
      href: child.url,
    })),
  });
  const directoryChildren = node.children.filter((child) =>
    directoryNodes.includes(child)
  );

  const theme = useTheme();
  const classes = useStyles();
  const { isMedium, isLarge } = useMedia(theme);
  let cols = 1;
  if (isMedium) {
    cols = 2;
  } else if (isLarge) {
    cols = 3;
  }
  return (
    <ImageList
      variant="masonry"
      cols={cols}
      gap={parseFloat(theme.spacing(2))}
      className={classes.list}
    >
      <ImageListItem
        key={node.path}
        className={clsx(classes.card, classes.major)}
      >
        <MultirowTextCard data={getSubtree(node)} modifier="gradient" />
      </ImageListItem>

      {directoryChildren.map((child) => (
        <ImageListItem key={child.path} className={classes.card}>
          <MultirowTextCard data={getSubtree(child)} modifier="default" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
