import { useState } from 'react';
import { Box, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import project from 'config/project';
import useStyles from './styles';
import clsx from 'clsx';

const TextLink = ({ text, ...props }) => {
  const classes = useStyles();
  return (
    <a target="_blank" className={classes.link} {...props}>
      {text}
    </a>
  );
};



// to create componentn Popup
const MaxWidthDialog = () =>  {
  const [open, setOpen] = useState(false);
  // to use responsive;
  const fullWidth = true;
  const maxWidth = 'sm';
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }
  return (<>
    <Typography onClick={handleClickOpen}>
        text called labeled, click then open.
    </Typography>
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle> the title</DialogTitle>
      <DialogContent>
        <Typography> the content descriton set the condition to use Dialog content text or allow user to pass JSX element children</Typography>
      </DialogContent>

<DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>

    </Dialog>



  </>)

}



const ProjectColumn = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.text}>Project</Typography>
      <TextLink text="Github" href={project.github} />
      <MaxWidthDialog />


      <a href={project.attribution} className={classes.link}>
  TODO TODO TODO       Attributioy
      </a>
      <TextLink text='License' href={project.license} />
    </>
  );
};

const AuthorColumn = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.text}>Author</Typography>
      <TextLink text='Email' href={project.email}/>
      <TextLink text='Stack Overflow' href={project.stackOverflow} />
    </>
  );
};

const Logo = () => {
  const classes = useStyles();
  return (
    <>
      <img src="/images/common/jatwing.png" className={classes.image} />
      <Typography className={classes.text}>
        Copyright &copy; {project.year} {project.author}
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
          <ProjectColumn />
        </Grid>
        <Grid item xs={6} sm={6} md={4} className={classes.column}>
          <AuthorColumn />
        </Grid>
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
        <Grid item xs={12} sm={12} md={4} className={classes.logo}>
          <Logo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
