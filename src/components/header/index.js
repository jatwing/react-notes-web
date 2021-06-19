import { useLocation } from "react-router-dom";
import Link from "components/link";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import classNameHelper from "utils/class-name-helper";
import style from "./style.module.css";
import { rootAlias, getNodes, getPath } from "utils/path-helper";

const cls = classNameHelper(style);

const Header = () => {
  const { pathname } = useLocation();
  const [internalNodes, leaf] = getNodes(pathname);

  return (
    <AppBar position="static" color="primary" className={cls("app-bar")}>
      <Toolbar className={cls("toolbar")}>
        <Typography variant="h6" className={cls("title", "lighter")}>
          <Link
            href="/"
            color="inherit"
            key={"/"}
            className={cls("title", "lighter")}
          >
            {rootAlias}
          </Link>
        </Typography>
        {internalNodes.map((i) => (
          <Typography variant="h6">
            <Link
              href={getPath(pathname, i)}
              color="inherit"
              key={i}
              className={cls("title", "lighter")}
            >
              {i}
            </Link>
          </Typography>
        ))}
        <Typography
          variant="h6"
          color="inherit"
          className={cls("title", "bolder")}
        >
          {leaf}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
