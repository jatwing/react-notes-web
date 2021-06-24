/*
 * Usage:
 *   import style from "./style.module.css"
 *   const cls = classNameHelper(style);
 *   const className = cls("class1", "class2")
 * Result:
 *   const className = clsx(style["class1"], style["class2"])
 */

import clsx from 'clsx';
const classNameHelper = (style) => (...classes) => {
  const styles = classes.map((c) => style[c]);
  return clsx(...styles);
};

export default classNameHelper;
