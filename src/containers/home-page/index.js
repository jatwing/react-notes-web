import { useTranslation } from 'react-i18next';
import { Markdown } from 'src/components/data-display/markdown';
import { readmeMarkdown } from 'src/lib/preval';

export const HomePage = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {'us this page for testing'}
      {' TODO delete this container, move to app.js'}
      <button
        onClick={() => {
          i18n.changeLanguage('en-US').then(() => {
            console.log('hand-crafted callback');
          });
        }}
      >
        en
      </button>
      <button
        onClick={() => {
          i18n.changeLanguage('zh-TW').then(() => {
            console.log('hand-crafted callback');
          });
        }}
      >
        {' '}
        tc{' '}
      </button>
      <Markdown markdown={readmeMarkdown} />;
    </>
  );
};
