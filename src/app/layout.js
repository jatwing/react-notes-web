import './styles.css';

import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { pageItems, traverse, reverse } from 'src/utils/page-urls';
import { useToggle } from 'src/utils/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useRankingSort } from 'src/redux/rankings/hooks';
import { JatwingIcon } from 'src/components/data-display/icons';
import { useProjects } from 'src/redux/projects/hooks';

const useStyles = makeStyles((theme) => {
  return {
    /** block */
    content: {
      flex: '1',
      padding: '32px',
    },
    /** container  */
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      minHeight: '100vh',
    },
    containerTwo: {
      display: 'flex',
    },
  };
});

/**
 * and the new package name
 */
export const Layout = () => {
  const [items, setItems] = useState(pageItems);

  const location = useLocation();

  const [isOpen, setIsOpen] = useToggle();
  const projects = useProjects();
  const { t, i18n } = useTranslation();
  const sort = useRankingSort();

  useEffect(() => {
    const newItems = items;
    traverse(newItems, (node) => {
      node.name = t(node.filename);
    });
    setItems(newItems);
  }, [t]);
  useEffect(() => {
    const newItems = items;
    traverse(newItems, (node) => {
      if (node.children) {
        sort(node.children, node.url, 'url');
      }
    });
    setItems(newItems);
  }, [sort]);

/*
  useEffect(() => {
    console.log(' # EFF')
    const newItems = items;
    let selectedNode = null;
    traverse(newItems, (node) => {
      if (node.url === location.pathname) {
        selectedNode = node;
      } else {
        node.isSelected = false;
      }
    });
    if (!selectedNode) {
      return;
    }
    reverse(selectedNode, (node) => {

      node.isSelected = true;
      console.log(node)
    });
    setItems(newItems);
    console.log('a # EFF 2')
  }, [location]);
*/


  const classes = useStyles();

  const title = projects?.entities?.[0]?.title?.[i18n?.language];
  return (
    <Box className={classes.container}>
      <Box className={classes.containerTwo}>
        <ResponsiveDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          items={items}
          url={location?.pathname}
          Logo={JatwingIcon}
          title={title}
        />
        <Box>
          <div>{'app bar content and footer'}</div>

          <div>
            <Button onClick={() => setIsOpen(true)}>{'test button'}</Button>
          </div>

          <div>{t('github')}</div>
        </Box>
      </Box>
    </Box>
  );
};
