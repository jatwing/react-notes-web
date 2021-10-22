import { readmeMarkdown } from 'src/lib/preval';
import { Markdown } from 'src/components/data-display/markdown';

export const HomePage = () => {
  return <Markdown markdown={readmeMarkdown} />;
};
