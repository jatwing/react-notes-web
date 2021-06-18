import { Link as MaterialLink } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

//https://codesandbox.io/s/89h9q?file=/demo.js

// https://material-ui.com/guides/composition/#link
const Link = ({ props }) => (
  <MaterialLink component={RouterLink}   {...props} />
)


export default Link;
