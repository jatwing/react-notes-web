import preval from 'preval.macro';

const buildDate = preval`
  const date = new Date();
  module.exports = {
    date: date.toDateString(),
    time: date.toTimeString(),
  }
`;

const pageFiles = preval`
  const { statSync, readdirSync } = require('fs');
  const { join } = require("path");

  const getDirectories = (path) => {
    const isDirectory = (path) => statSync(path).isDirectory();
    return readdirSync(path)
      .map((name) => join(path, name))
      .filter(isDirectory);
  };

  const getFiles = (path) => {
    const isFile = (path) => statSync(path).isFile();
    return readdirSync(path)
      .map((name) => join(path, name))
      .filter(isFile);
  };

  const getFilesRecursively = (path) => {
    const directories = getDirectories(path);
    const files = directories
      .map((directory) => getFilesRecursively(directory))
      .reduce((a, b) => a.concat(b), []);
    return files.concat(getFiles(path));
  };

  module.exports = getFilesRecursively('src/pages');
`;

export { buildDate, pageFiles };
