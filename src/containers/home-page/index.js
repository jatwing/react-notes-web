import { readmeMarkdown } from 'src/lib/preval';
import { Markdown } from 'src/components/data-display/markdown';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {'us this page for testing'}
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
  )
};
