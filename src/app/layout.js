import './styles.css';

import { Box } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { Banner } from 'src/sections/banner';
import { Footer } from 'src/sections/footer';
import { Header } from 'src/sections/header';

import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';

import { Button } from '@mui/material';

import { useToggle } from 'src/utils/react';
import {  traverse,pageUrls } from 'src/utils/url'

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
 * the pages file system / url values indep
 * from component
 */

const getPageItems = (pageUrls) => {
  const pageItems = pageUrls;
  const modifyNode = (node) => {
    if (node.urlType === 'directory') {
      node.type = 'list'
    } else if (node.urlType === 'file') {
      node.type = 'item'
    }
    node.href = node.url;
  }
  traverse(pageItems, modifyNode)
  return pageItems;
}
const pageItems = getPageItems(pageUrls);


/**
 * test the drawer
 * and the new package name
 */
export const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useToggle();

  // NEW data online required on firebase maybe
  // TODO retrieve the translation here, and update the node name


  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.containerTwo}>
        <ResponsiveDrawer isOpen={isOpen} setIsOpen={setIsOpen} items={pageItems}/>
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
