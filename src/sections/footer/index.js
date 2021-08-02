import { createContext, useContext } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import ExternalLink from 'components/external-link';
import useStyles from './styles';
import useDialogStyles from './dialogStyles';
import ClickableElementPopupDialog from 'components/clickable-element-popup-dialog';
import { useReadingAuthor, useProject } from 'hooks';
import { DocumentRenderer } from '@keystone-next/document-renderer';
import { getAssetUrl   } from 'utils/client';

const Context = createContext({});

const ProjectColumn = () => {
  const { project } = useContext(Context);
  const classes = useStyles();
  const dialogClasses = useDialogStyles();
  if (project.loading) {
    return <Typography className={classes.text}>Loading...</Typography>;
  }
  if (project.error) {
    return <Typography className={classes.text}>Error!</Typography>;
  }
  const element = <Typography className={classes.link}>Attribution</Typography>;
  const title = (
    <Typography className={dialogClasses.text}>Attribution</Typography>
  );
  const content = (
    <DocumentRenderer document={project.data.Project.attribution.document} />
  );
  return (
    <Box>
      <Typography className={classes.text}>Project</Typography>
      <ExternalLink
        text={'Github'}
        href={project.data.Project.github}
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
        href={project.data.Project.license}
        className={classes.link}
      />
    </Box>
  );
};

const AuthorColumn = () => {
  const { author } = useContext(Context);
  const classes = useStyles();
  if (author.loading) {
    return <Typography className={classes.text}>Loading...</Typography>;
  }
  if (author.error) {
    return <Typography className={classes.text}>Error!</Typography>;
  }
  return (
    <Box>
      <Typography className={classes.text}>Author</Typography>
      <ExternalLink
        text={'Email'}
        href={author.data.Author.email}
        className={classes.link}
      />
      <ExternalLink
        text={'Stack Overflow'}
        href={author.data.Author.stackOverflow}
        className={classes.link}
      />
    </Box>
  );
};

const Logo = () => {
  const { author, project } = useContext(Context);
  const classes = useStyles();
  if (author.loading || project.loading) {
    return <Typography className={classes.text}>Loading...</Typography>;
  }
  if (author.error || project.error) {
    return <Typography className={classes.text}>Error!</Typography>;
  }
  return (
    <Box>
      <img
        src={
          getAssetUrl(author.data.Author.avatar.src)
        }
        alt="jatwing"
        className={classes.image}
      />
      <Typography className={classes.text}>
        {project.data.Project.copyright}
      </Typography>
    </Box>
  );
};

const Footer = () => {
  const author = useReadingAuthor('jatwing')
  const project = useProject('react-notes');
  const value = {
    author: author,
    project: project,
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

export default Footer;
