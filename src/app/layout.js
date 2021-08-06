import 'config/styles.css';

import { Box } from '@material-ui/core';
import { Banner, Footer, Header } from 'sections';

import { useStyles } from './styles';

const Layout = ({ children }) => {
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

export { Layout };
