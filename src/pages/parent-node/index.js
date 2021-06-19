import Link from "components/link";
import { Box, Card, Typography } from "@material-ui/core";
import useStyles from "./styles";
import clsx from "clsx";

const TreeCard = ({ tree, modifier }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root)}>
      <Box className={clsx(classes.header)}>
        <Box className={clsx(classes.row, classes[modifier])}>
          <Typography variant="h6" >{tree.parent}</Typography>
        </Box>
      </Box>
      <Box className={clsx(classes.content)}>
        {tree.children.map((c) => (
          <Box className={clsx(classes.row, classes[modifier])}>
            <Typography variant="body1">
              <Link href={tree.path + "/" + c} color="inherit">
                {c}
              </Link>
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

const ParentNode = ({ subtree, subsubtrees }) => {
  return (
    <>
      <TreeCard tree={subtree} modifier="primary"/>
      {subsubtrees.map((t) => (
        <TreeCard tree={t} modifier="secondary"/>
      ))}
    </>
  );
};

export default ParentNode;
