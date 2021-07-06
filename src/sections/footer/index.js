import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import ExternalLink from 'components/external-link';
import project from 'config/project';
import useStyles from './styles';
import useDialogStyles from './dialogStyles';
import ClickableElementPopupDialog from 'components/clickable-element-popup-dialog';

const AttributionPopupDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { title: documentTitle, author, license } = project.attribution;
  const handleClickClose = () => {
    setIsOpen(false);
  };
  const classes = useStyles();
  const dialogClasses = useDialogStyles();
  const element = <Typography className={classes.link}>Attribution</Typography>;
  const title = (
    <Typography className={dialogClasses.text}>Attribution</Typography>
  );
  const content = (
    <Typography className={dialogClasses.text}>
      <ExternalLink
        text={documentTitle.name}
        href={documentTitle.href}
        className={dialogClasses.link}
      />
      {' by '}
      <ExternalLink
        text={author.name}
        href={author.href}
        className={dialogClasses.link}
      />
      {' is licensed under a '}
      <ExternalLink
        text={license.name}
        href={license.href}
        className={dialogClasses.link}
      />
      {'.'}
    </Typography>
  );
  const actions = (
    <Button onClick={handleClickClose} className={dialogClasses.button}>
      Close
    </Button>
  );

  return (
    <ClickableElementPopupDialog
      element={element}
      title={title}
      content={content}
      actions={actions}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      classes={dialogClasses}
    />
  );
};

const ProjectColumn = () => {
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.text}>Project</Typography>
      <ExternalLink
        text={'Github'}
        href={project.github}
        className={classes.link}
      />
      <AttributionPopupDialog />
      <ExternalLink
        text={'License'}
        href={project.license}
        className={classes.link}
      />
    </Box>
  );
};

const AuthorColumn = () => {
  const classes = useStyles();
  return (
    <Box>
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
    <Box>
      <img
        src="/images/common/jatwing.png"
        alt="jatwing"
        className={classes.image}
      />
      <Typography className={classes.text}>{project.copyright}</Typography>
    </Box>
  );
};

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Grid container className={classes.internalContainer}>
        <Grid item xs={6} sm={6} md={3} className={classes.column}>
          <ProjectColumn />
        </Grid>
        <Grid item xs={6} sm={6} md={3} className={classes.column}>
          <AuthorColumn />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className={classes.logo}>
          <Logo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
