import { createContext, useContext } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { ExternalLink, ClickableElementPopupDialog } from 'components';
import { useStyles } from './styles';
import { useDialogStyles } from './dialogStyles';
import { useReadingAuthor, useReadingProject } from 'hooks';
import { DocumentRenderer } from '@keystone-next/document-renderer';
import { getAssetUrl } from 'utils';

const Context = createContext({});

const ProjectColumn = () => {
  const { readProject } = useContext(Context);
  const { loading, error, data } = readProject;

  const classes = useStyles();
  const dialogClasses = useDialogStyles();
  if (loading) {
    return <Typography className={classes.text}>Loading...</Typography>;
  }
  if (error) {
    return <Typography className={classes.text}>Error!</Typography>;
  }

  const project = data.Project;
  const element = <Typography className={classes.link}>Attribution</Typography>;
  const title = (
    <Typography className={dialogClasses.text}>Attribution</Typography>
  );
  const content = <DocumentRenderer document={project.attribution.document} />;
  return (
    <>
      <Typography className={classes.text}>Project</Typography>
      <ExternalLink
        text={'Github'}
        href={project.github}
        className={classes.link}
      />
      <ClickableElementPopupDialog
        element={element}
        title={title}
        content={content}
        classes={dialogClasses}
      />
      <ExternalLink
        text={'License'}
        href={project.license}
        className={classes.link}
      />
    </>
  );
};

const AuthorColumn = () => {
  const { readAuthor } = useContext(Context);
  const { loading, error, data } = readAuthor;

  const classes = useStyles();
  if (loading) {
    return <Typography className={classes.text}>Loading...</Typography>;
  }
  if (error) {
    return <Typography className={classes.text}>Error!</Typography>;
  }

  const author = data.Author;
  return (
    <>
      <Typography className={classes.text}>Author</Typography>
      <ExternalLink
        text={'Email'}
        href={author.email}
        className={classes.link}
      />
      <ExternalLink
        text={'Stack Overflow'}
        href={author.stackOverflow}
        className={classes.link}
      />
    </>
  );
};

const Logo = () => {
  const { readProject } = useContext(Context);
  const { loading, error, data } = readProject;

  const classes = useStyles();
  if (loading) {
    return <Typography className={classes.text}>Loading...</Typography>;
  }
  if (error) {
    return <Typography className={classes.text}>Error!</Typography>;
  }

  const project = data.Project;
  return (
    <>
      <img
        src={getAssetUrl(project.avatar.src)}
        alt="jatwing"
        className={classes.image}
      />
      <Typography className={classes.text}>{project.copyright}</Typography>
    </>
  );
};

const Footer = () => {
  const readAuthor = useReadingAuthor('jatwing');
  const readProject = useReadingProject('react-notes');
  const value = {
    readAuthor,
    readProject,
  };

  const classes = useStyles();
  return (
    <Context.Provider value={value}>
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
    </Context.Provider>
  );
};

export { Footer };
