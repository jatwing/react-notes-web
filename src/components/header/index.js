import { useLocation } from "react-router-dom";
import { AppBar, Link, Toolbar, Typography } from "@material-ui/core";
import classNameHelper from "utils/class-name-helper";
import style from "./style.module.css";

const cls = classNameHelper(style);

const Header = () => {
  const { pathname } = useLocation();
  const path = pathname.substring(1);
  let internalNodes  = [];
  let leaf = "";
  if (path) {
    const nodes = path.split("/");
    internalNodes = nodes.slice(0, -1);
    leaf = nodes.slice(-1)[0];
  }
  const getNodePath = (fullPath, node) => {
    const length = fullPath.indexOf(node) + node.length;
    return fullPath.substring(0, length);
  };
  return (
    <AppBar position="static" color="primary" className={cls("app-bar")}>
      <Toolbar className={cls("toolbar")}>
        <Typography variant="h6" className={cls("title", "lighter")}>
          <Link href="/" color="inherit">
            Home
          </Link>
        </Typography>
        {internalNodes.map((i) => (
          <Typography variant="h6">
            <Link
              href={getNodePath(pathname, i)}
              color="inherit"
              key={i}
              className={cls("title", "lighter")}
            >
              {i}
            </Link>
          </Typography>
        ))}
        <Typography variant="h6" color="inherit">
          {leaf}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
