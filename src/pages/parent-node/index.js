import Link from 'components/link';
import { Box, Card, Grid, Typography } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';
import useMedia from 'utils/media';

const TreeCard = ({ tree, modifier }) => {
  const classes = useStyles();
  const directory = tree.path === '/' ? '/' : tree.path + '/';
  const { isSmall, isMedium, isLarge } = useMedia();
  return (
    <Card className={clsx(classes.root)}>
      <Box className={clsx(classes.header)}>
        <Link href={tree.path} className={clsx(classes.link)}>
          <Box className={clsx(classes.row, classes[modifier])}>
            <Typography className={clsx(classes.text)}>
              {tree.parent}
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box className={clsx(classes.content)}>
        {tree.children.map((c) => (
          <Link href={directory + c} className={clsx(classes.link)}>
            <Box className={clsx(classes.row, classes[modifier])}>
              <Typography className={clsx(classes.text)}>{c}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Card>
  );
};


/*
 * see https://material-ui.com/components/grid-list/
 */

const ParentNode = ({ subtree, subsubtrees }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={0} sm={0} md={3} lg={4} />
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <TreeCard tree={subtree} modifier="major" />
      </Grid>
      <Grid item xs={0} sm={0} md={3} lg={4} />
      {subsubtrees.map((t) => (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TreeCard tree={t} modifier="minor" />
        </Grid>
      ))}
    </Grid>
  );
};

export default ParentNode;
