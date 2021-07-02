import { Box } from '@material-ui/core';
import useStyles from './styles';
import Header from 'sections/header';
import Footer from 'sections/footer'

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Header />
      <Box className={classes.content}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
