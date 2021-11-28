import preval from 'preval.macro';

export const readmeMarkdown: string = preval`
const { statSync, readFileSync } = require('fs');
const getFileContent = (path) => {
  if (statSync(path).isFile()) {
    return readFileSync(path, 'utf8');
  }
  return '';
};
module.exports = getFileContent('README.md');
`;

export type PageFileNode = {
  filename: string;
  path: string;
  content: null | string;
  children: null | Array<PageFileNode>;
  discipline: string;
};

export const pageFileTree: null | PageFileNode = preval`
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
  'src/pages/beginner-tutorial': 'saga',
};
const getPageFileTree = (path, discipline = '') => {
  const filename = basename(path);
  const subDiscipline = disciplines[path] || discipline;
  if (statSync(path).isFile()) {
    if (filename === 'index.tsx' || filename === 'slice.ts') {
      return {
        filename,
        path,
        content: readFileSync(path, 'utf8'),
        children: null,
        discipline: disciplines[path] || discipline,
      };
    }
  }
  if (statSync(path).isDirectory()) {
    const children = readdirSync(path)
      .map((childFilename) =>
        getPageFileTree(path + '/' + childFilename, subDiscipline),
      )
      .filter((child) => !!child);
    if (!children.length) {
      return null;
    }
    return {
      filename,
      path,
      content: null,
      children,
      discipline: subDiscipline,
    };
  }
  return null;
};
module.exports = getPageFileTree('src/pages');
`;

export const buildDate: Date = new Date(
  JSON.parse(preval`module.exports = JSON.stringify(new Date());`),
);
