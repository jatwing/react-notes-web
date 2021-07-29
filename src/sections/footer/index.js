import { createContext, useContext, useEffect } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import ExternalLink from 'components/external-link';
import useStyles from './styles';
import useDialogStyles from './dialogStyles';
import ClickableElementPopupDialog from 'components/clickable-element-popup-dialog';
import {
  useAuthentication,
  useCreatingAuthentication,
  useAuthor,
  useProject,
} from 'hooks';
import { DocumentRenderer } from '@keystone-next/document-renderer';

import { getUrl } from 'utils/client';

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


  // document.cookie="keystonejs-session=Fe26.2**1de7769406876509e1ebae247f2df51a0052c97c4acbcc9c25c49fe34eb2cc9e*s5gKrknYTDaViCTSeWeI3A*uKFDpS3gfrRjVG96JiQ33BxBAzR3MjEyTrSm0TdIL2dvx7UmXdxGIfNOz0Sufg94yQcFSqv7Md6QpiPiyx1ZBQ*1630040670669*9cb1c6fda8e2a5d3c2fcff2dea17ab63ca636b9cc02c832f16c64a85df85b8aa*uIQiTPLemzHHbakA7w-EMzlNKB9m-kt2XEX7zNDOPBU"

  console.log(document.cookie)


  return (
    <Box>
      <img
        src={
        
          //  getUrl(author.data.Author.avatar.src)
          'https://common-cms.jatwing.com/images/dd0a66fc-d171-42bb-b413-ff6abd729b43.png'
          // crossOrigin="use-credentials" below
        }
        crossOrigin="use-credentials"
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
  //  @see https://www.apollographql.com/docs/react/api/core/ApolloClient/
  // auth()

  // test the code inside the Footer component
  // @see https://www.apollographql.com/docs/react/data/mutations/

  // return a tuple [mutate function, object that represents mutation status]
  const [createAuthentication, { data }] = useCreatingAuthentication(
    process.env.REACT_APP_EMAIL,
    process.env.REACT_APP_PASSWORD
  );
  useEffect(() => {
    console.log(" i createe")
    createAuthentication();
  }, []);


  useEffect(() => {
    if (!data || !("authenticateUserWithPassword" in data)) {
      return
    }
    const result = data["authenticateUserWithPassword"]
    if (result?.code === "FAILURE") {
      console.log(result?.message)
      return
    }
    if ('sessionToken' in result) {

  //    document.cookie = `keystonejs-session=${result.sessionToken}; SameSite=None; Secure`
      console.log("     *&:")
    }


  }, [data])

  const author = useAuthor('jatwing');
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
