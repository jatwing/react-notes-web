import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ClickableElementPopupDialog, ExternalLink } from 'src/components';
import { getAssetUrl } from 'src/utils';

import { useDialogStyles } from './dialogStyles';
import { useStyles } from './styles';
import { useAuthors } from 'src/redux/authors/context';
import { useProjects } from 'src/redux/projects/hooks';

const ProjectColumn = () => {
  const { isSucceed, projects } = useProjects();
  const { t } = useTranslation();
  const classes = useStyles();
  const dialogClasses = useDialogStyles();

  if (!isSucceed) {
    return <Typography className={classes.text}>Loading...</Typography>;
  }

  const project = projects[0];
  const element = <Typography className={classes.link}>Attribution</Typography>;
  const title = (
    <Typography className={dialogClasses.text}>Attribution</Typography>
  );
  const content = (
    <div dangerouslySetInnerHTML={{ __html: project.attribution }}></div>
  );

  return (
    <>
      <Typography className={classes.text}>Project</Typography>
      <ExternalLink
        text={t('github')}
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
        text={t('license')}
        href={project.license}
        className={classes.link}
      />
    </>
  );
};

const AuthorColumn = () => {
  const { isSucceed, authors } = useAuthors();
  const { t } = useTranslation();
  const classes = useStyles();

  if (!isSucceed) {
    return <Typography className={classes.text}>Loading...</Typography>;
  }

  return (
    <>
      <Typography className={classes.text}>Author</Typography>
      <ExternalLink
        text={t('email')}
        href={authors[0].email}
        className={classes.link}
      />
      <ExternalLink
        text={t('stackOverflow')}
        href={authors[0].stackOverflow}
        className={classes.link}
      />
    </>
  );
};

const Logo = () => {
  const { isSucceed, projects } = useProjects();
  const { t } = useTranslation();
  const classes = useStyles();
  if (!isSucceed) {
    return <Typography className={classes.text}>Loading...</Typography>;
  }
  const project = projects[0];
  return (
    <>
      <img
        src={project.avatar}
        alt={t('avatar')}
        className={classes.image}
      />
      <Typography className={classes.text}>{project.copyright}</Typography>
    </>
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

export { Footer };
