import { Box, Grid } from '@material-ui/core';
import links from 'config/links';
import useStyles from './styles';
import clsx from 'clsx';

const Logo = () => {
  const classes = useStyles();

  return (
    <>
      <img src="/images/common/jatwing.png" className={classes.image} />
      <p className={classes.text}> jatwing </p>
    </>
  );
};

/**
 * meaningful block name would be
 *
 * logo links and footnote
 *
 *  Do not forget to use Typography to unify the font style
 */

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} className={classes.topLeft}>
          <Logo />
        </Grid>

        <Grid item xs={12} sm={12} md={6} className={classes.topRight}>
          <p className={classes.link}>
            <a href={links.github}> Github repository for this website</a>
          </p>

          {/*
           * missing the original title, the original license, but how to display that
           * with some sort of consistency ???
           *
           *
           * a popup ???? but the link may be click ASAP
           *
           * a popup with the link to the article, author and license
           *
           * a sentence same as the README Attribution
           */}
          <p className={classes.link}>
            <a href={links.attribution}>Attribution</a>
          </p>

          <p className={classes.link}>
            <a href={links.license}>License</a>
          </p>
        </Grid>
      </Grid>

      <hr />

      <p className={classes.text}>Copyright &copy; 2021 jatwing</p>
    </Box>
  );
};

export default Footer;
