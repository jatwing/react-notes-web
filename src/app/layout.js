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
    setItems((items) => {
      const newItems = items;

      //  const newItems = JSON.parse(JSON.stringify(items))
      traverse(newItems, (node) => {
        node.name = t(node.filename);
      });
      return newItems;
    });
  }, [t]);
  useEffect(() => {
    setItems((items) => {
      const newItems = items;
      traverse(newItems, (node) => {
        if (node.children) {
          sort(node.children, node.url, 'url');
        }
      });
      return newItems;
    });
  }, [sort]);

  useEffect(() => {
    setItems((items) => {
      // deep copy, modify and set as new state
      const newItems = JSON.parse(JSON.stringify(items));

      console.log(location.pathname);
      traverse(newItems, (node) => {
        const regex = new RegExp(`^${node.url}([^/])*(/.+)*$`);
        if (regex.test(location.pathname)) {
          node.isSelected = true;
          return;
        }
        node.isSelected = false;
      });
      return newItems;
    });
  }, [location]);

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
