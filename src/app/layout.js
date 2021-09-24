import './styles.css';

import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { Banner } from 'src/sections/banner';
import { Footer } from 'src/sections/footer';
import { Header } from 'src/sections/header';
import { pageItems, traverse } from 'src/utils/page-urls';
import { useToggle } from 'src/utils/react';
import { useTranslation } from 'react-i18next';

import { useRankingHelper } from 'src/redux/rankings/hooks';
import { JatwingIcon } from 'src/components/data-display/icons';
import { useProjects } from 'src/redux/projects/hooks'

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
  const [isOpen, setIsOpen] = useToggle();
  const projects = useProjects();
  const { t, i18n } = useTranslation();
  const rank = useRankingHelper();
  useEffect(() => {
    const modifyNode = (node) => {
      node.name = t(node.filename);
      if (node.children) {
        rank(node.children, node.url, 'url');
      }
    };
    traverse(pageItems, modifyNode);
  }, [rank]);

  const classes = useStyles();

  const title = projects?.entities?.[0]?.title?.[i18n?.language];
  return (
    <Box className={classes.container}>
      <Box className={classes.containerTwo}>
        <ResponsiveDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          items={pageItems}
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
