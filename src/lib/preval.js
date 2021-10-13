import preval from 'preval.macro';

export const pageFileTree = preval`
const { statSync, readdirSync, readFileSync } = require('fs');
const getPageFileTree = (filename, path) => {
  if (statSync(path).isDirectory()) {
    const children = readdirSync(path)
      .map((childFilename) =>
        getPageFileTree(childFilename, path + '/' + childFilename)
      )
      .filter((child) => !!child);
    if (!children.length) {
      return null;
    }
    return {
      filename,
      path,
      pathType: 'directory',
      children,
    };
  } else if (
    statSync(path).isFile() &&
    /^index.(js|jsx|ts|tsx)$/.test(filename)
  ) {
    return {
      filename,
      path,
      pathType: 'file',
      content: readFileSync(path, 'utf8'),
    };
  }
  return null;
};
module.exports = getPageFileTree('src/pages', 'src/pages');
`;

/**
 * TODO can we obtain the object
 */
export const buildDate = preval`
const date = new Date();
module.exports = {
  date: date.toDateString(),
  time: date.toTimeString(),
}
`;
