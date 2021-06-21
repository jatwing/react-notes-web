import Link from 'components/link';
import { Box, Card, Typography } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

import useMedia from "utils/media";


const TreeCard = ({ tree, modifier }) => {
  const classes = useStyles();
  const directory = tree.path === '/' ? '/' : tree.path + '/';
  const { isSmall, isMedium, isLarge }  = useMedia();
  return (
    <Card className={clsx(classes.root)}>

      <Box>{`${isSmall}, ${isMedium}, ${isLarge}`}</Box>
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

const ParentNode = ({ subtree, subsubtrees }) => {
  const classes = useStyles()
  return (
    <>
      <TreeCard tree={subtree} modifier="major" />
      {subsubtrees.map((t) => (
        <TreeCard tree={t} modifier="minor" />
      ))}
    </>
  );
};

export default ParentNode;
