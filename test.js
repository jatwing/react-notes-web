const { statSync, readdirSync, readFileSync } = require('fs');
const getPageFiles = (filename, path) => {
  if (statSync(path).isDirectory()) {
    const children = readdirSync(path)
      .map((childFilename) =>
        getPageFiles(childFilename, path + '/' + childFilename)
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
module.exports = getPageFiles('src/pages', 'src/pages');
