import './styles.css';

import { Box } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { Banner } from 'src/sections/banner';
import { Footer } from 'src/sections/footer';
import { Header } from 'src/sections/header';

import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';

import { Button } from '@mui/material';

import { useToggle } from 'src/utils/react';

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
 * test the drawer
 * and the new package name
 */
export const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useToggle();

  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.containerTwo}>
        <ResponsiveDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box>
          <div>{'app bar content and footer'}</div>
          <div>
            <Button onClick={() => setIsOpen(true)}>{'test button'}</Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
