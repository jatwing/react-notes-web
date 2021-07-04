import { Box, Grid, Typography } from '@material-ui/core';
import project from 'config/project';
import useStyles from './styles';
import useDialogStyles from './dialogStyles';
import ClickableElementPopupDialog from 'components/clickable-element-popup-dialog';

const AttributionPopupDialog = () => {
  const { title: documentTitle, author, license } = project.attribution;
  const classes = useStyles();
  const dialogClasses = useDialogStyles();
  const element = (
    <Typography className={classes.link}>Attribution</Typography>
  );
  const title = (
    <Typography className={dialogClasses.text}>Attribution</Typography>
  );
  const content = (
    <Typography className={dialogClasses.text}>
      <a href={documentTitle.href} target="_blank" className={dialogClasses.link}>
        {documentTitle.name}
      </a>{' '}
      by{' '}
      <a href={author.href} target="_blank" className={dialogClasses.link}>
        {author.name}
      </a>{' '}
      is licensed under a{' '}
      <a href={license.href} target="_blank" className={dialogClasses.link}>
        {license.name}
      </a>
      .
    </Typography>
  );
  return (
    <ClickableElementPopupDialog
      element={element}
      title={title}
      content={content}
      classes={dialogClasses}
    />
  );
};

const ProjectColumn = () => {
  const classes = useStyles();
  return (
    <Box className={classes.column}>
      <Typography className={classes.text}>Project</Typography>
      <a href={project.github} target="_blank" className={classes.link}>
        Github
      </a>
      <AttributionPopupDialog />
      <a href={project.license} target="_blank" className={classes.link}>
        License
      </a>
    </Box>
  );
};

const AuthorColumn = () => {
  const classes = useStyles();
  return (
    <Box className={classes.column}>
      <Typography className={classes.text}>Author</Typography>
      <a href={project.email} target="_blank" className={classes.link}>
        Email
      </a>
      <a href={project.stackOverflow} target="_blank" className={classes.link}>
        Stack Overflow
      </a>
    </Box>
  );
};

const Logo = () => {
  const classes = useStyles();
  return (
    <Box className={classes.logo}>
      <img src="/images/common/jatwing.png" className={classes.image} />
      <Typography className={classes.text}>{project.copyright}</Typography>
    </Box>
  );
};

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Grid container className={classes.innerContainer}>
        <Grid item xs={6} sm={6} md={3}>
          <ProjectColumn />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <AuthorColumn />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Logo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
