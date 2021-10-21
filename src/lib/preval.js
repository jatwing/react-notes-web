import preval from 'preval.macro';

export const readmeMarkdown = preval`
const { statSync, readFileSync } = require('fs');
const getFileContent = (path) => {
  if (statSync(path).isFile()) {
    return readFileSync(path, 'utf8');
  }
  return '';
};
module.exports = getFileContent('README.md');
`

export const pageFileTree = preval`
const {
  posix: { basename },
} = require('path');
const { statSync, readdirSync, readFileSync } = require('fs');
const disciplines = {
  'src/pages/tutorial-intro-to-react': 'react',
  'src/pages/main-concepts': 'react',
  'src/pages/advanced-guides': 'react',
  'src/pages/hooks': 'react',
  'src/pages/redux-essentials': 'redux',
  'src/pages/beginner-tutorial': 'redux-saga',
};
const getPageFileTree = (path, discipline = '') => {
  const filename = basename(path);
  if (statSync(path).isDirectory()) {
    const children = readdirSync(path)
      .map((childFilename) =>
        getPageFileTree(path + '/' + childFilename, discipline)
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
      discipline: disciplines[path] || discipline,
    };
  } else if (statSync(path).isFile()) {
    const isIndexFile = /^index.(js|jsx|ts|tsx)$/.test(filename);
    const isSliceFile = /^slice.(js|jsx|ts|tsx)$/.test(filename);
    if (isIndexFile || isSliceFile) {
      return {
        filename,
        path,
        pathType: 'file',
        isIndexFile,
        isSliceFile,
        content: readFileSync(path, 'utf8'),
        discipline: disciplines[path] || discipline,
      };
    }
  }
  return null;
};
module.exports = getPageFileTree('src/pages');
`;

export const buildTimeString = preval`
module.exports = JSON.stringify(new Date());
`;
