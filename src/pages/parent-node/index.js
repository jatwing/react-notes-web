import Link from "components/link"
import { Box, Card, CardContent,  Typography } from "@material-ui/core";

const TreeCard = ({ tree }) => (
  <Card>
    <CardContent>
      <Typography color="secondary">{tree["parent"]}</Typography>
      <Box bgcolor="secondary.main" color="secondary.contrastText">
        {tree["children"].map((c) => (
          <Typography>
            <Link href={tree["path"] + "/" + c} color="inherit">
              {" "}
              {c}
            </Link>
          </Typography>
        ))}
      </Box>
    </CardContent>
  </Card>
);

const ParentNode = ({ subtree, subtrees }) => {
  const childrenSubtrees = [];
  subtree["children"].forEach((c) => {
    const childrenSubtree = subtrees.find((t) => c === t["parent"]);
    if (childrenSubtree) {
      childrenSubtrees.push(childrenSubtree);
    }
  });
  return (
    <>
      <TreeCard tree={subtree} />
      {childrenSubtrees.map((t) => (
        <TreeCard tree={t} />
      ))}
    </>
  );
};

export default ParentNode;
