/*
 * https://reactrouter.com/web/api/Link
 * https://material-ui.com/api/link/
 */
import { Link as MaterialLink } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import classNameHelper from "utils/class-name-helper";
import style from "./style.module.css";
const cls = classNameHelper(style);

const preventDefault = (e) => e.preventDefault;

const test = ({
  to,
  replace,
  innerRef,
  component,
  // prop collision: "component"
  materialComponent,
  onClick,
  ...materialProps
}) => (
  <RouterLink
    to={to}
    replace={replace}
    innerRef={innerRef}
    component={component}
    className={cls("link", "router")}
  >
    <MaterialLink
      href={to}
      onClick={onClick || preventDefault}
      component={materialComponent}
      {...materialProps}
    />
  </RouterLink>
);

const Link = () => (
  <MaterialLink component={RouterLink} color="primary" to="/">
    that is a link{" "}
  </MaterialLink>
);

export default Link;

export { test };
