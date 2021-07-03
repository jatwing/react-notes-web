import { Box, Grid, Typography } from '@material-ui/core';
import project from 'config/project';
import useStyles from './styles';
import ClickableElementPopupDialog from 'components/clickable-element-popup-dialog';
import clsx from 'clsx';

const ProjectColumn = () => {
  const classes = useStyles();
  const element = <Typography className={classes.link}>Attribution</Typography>;
  const { title, author, license } = project.attribution;
  const content = (
    <p>
      <a href={title.href} target="_blank" className={classes.link}>
        {title.name}
      </a>{' '}
      by{' '}
      <a href={author.href} target="_blank" className={classes.link}>
        {author.name}
      </a>{' '}
      is licensed under a{' '}
      <a href={license.href} target="_blank" className={classes.link}>
        {license.name}
      </a>
    </p>
  );
  return (
    <>
      <Typography className={classes.text}>Project</Typography>
      <a href={project.github} target="_blank" className={classes.link}>
        Github
      </a>

      <ClickableElementPopupDialog
        element={element}
        title={'Attribution'}
        content={content}
      />

      <a href={project.license} target="_blank" className={classes.link}>
        License
      </a>
    </>
  );
};

const AuthorColumn = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.text}>Author</Typography>
      <a href={project.email} target="_blank" className={classes.link}>
        Email
      </a>
      <a href={project.stackOverflow} target="_blank" className={classes.link}>
        Stack Overflow
      </a>
    </>
  );
};

const Logo = () => {
  const classes = useStyles();
  return (
    <>
      <img src="/images/common/jatwing.png" className={classes.image} />
      <Typography className={classes.text}>
        {project.copyright}
      </Typography>
    </>
  );
};

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid container spacing={2} className={classes.columns}>
        <Grid item xs={6} sm={6} md={4} className={classes.column}>
          <ProjectColumn className={classes.column}/>
        </Grid>
        <Grid item xs={6} sm={6} md={4} className={classes.column}>
          <AuthorColumn />
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={classes.logo}>
          <Logo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
