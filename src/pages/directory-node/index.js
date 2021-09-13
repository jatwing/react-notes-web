import { ImageList, ImageListItem } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MultirowTextCard } from 'src/components';
import { directoryNodes, useMedia } from 'src/utils';


/*
 * try firebase and redux here TODO delete them all
 *
 */
import { useStyles } from './styles';
import { useProjects } from 'src/redux/projects/hooks'


const DirectoryNode = (props) => {
  const { node } = props;
  const { isSucceed, projects } = useProjects();


  useEffect(() => {
    if (node.name && node.name !== 'src/pages') {
      document.title = node.name;
      return;
    }
    if (!isSucceed) {
      return;
    }
    document.title = projects[0].title;
  }, [node, ]);

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

export { DirectoryNode };
