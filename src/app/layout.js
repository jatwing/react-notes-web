import { Box } from '@material-ui/core';
import useStyles from './styles';
import Banner from 'sections/banner'
import Header from 'sections/header';
import Footer from 'sections/footer'


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

export default Layout;
