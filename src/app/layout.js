import './styles.css';

import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { Anchor } from 'src/components/navigation/anchor';
import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { Banner } from 'src/sections/banner';
import { Footer } from 'src/sections/footer';
import { Header } from 'src/sections/header';
import { pageItems, traverse } from 'src/utils/page-urls';
import { useToggle } from 'src/utils/react';
import { useTranslation } from 'react-i18next';

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

/** TODO Delete */
export const Layout2 = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      {/*
      <Banner />
    */}
      <Box className={classes.containerTwo}>
        <ResponsiveDrawer />
        <Box>
          <Header />
          <Box className={classes.content}>{children}</Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

/**
 * and the new package name
 */
export const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useToggle();

  const { t} = useTranslation();

  // NEW data online required on firebase maybe
  // TODO retrieve the translation here, and update the node name


  // use Translation


  useEffect(() => {
    const modifyNode = (node) => {
      node.name = node.name + ':)';
      // TODO translate
      // TODO sort
    };
    traverse(pageItems, modifyNode);
  }, []);

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.containerTwo}>
        <ResponsiveDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          items={pageItems}
        />
        <Box>
          <div>{'app bar content and footer'}</div>

          <Anchor href="https://developer.mozilla.org/en-US/"> MDN</Anchor>

          <Anchor href="/"> home</Anchor>

          <div>
            <Button onClick={() => setIsOpen(true)}>{'test button'}</Button>
          </div>


          <div>
            {t('test')}
          </div>
        </Box>
      </Box>
    </Box>
  );
};
