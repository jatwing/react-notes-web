import { useTranslation } from 'react-i18next';
import { Markdown } from 'src/components/data-display/markdown';
import { readmeMarkdown } from 'src/lib/preval';

export const HomePage = () => {
  return <Markdown markdown={readmeMarkdown} />;
};

export default HomePage;
