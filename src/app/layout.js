import './styles.css';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Banner } from 'src/sections/banner';
import { Footer } from 'src/sections/footer';
import { Header } from 'src/sections/header';

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
  };
});

export const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Banner />
      <Header />
      <Box className={classes.content}>{children}</Box>
      <Footer />
    </Box>
  );
};
