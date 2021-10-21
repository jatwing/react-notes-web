import { Remarkable } from 'remarkable';
import { InnerHtml } from 'src/components/data-display/inner-html'

const remarkable = new Remarkable();

export const Markdown = (props) => {
  const { markdown='' } = props;
  return (
    <InnerHtml html={remarkable.render(markdown)} />
  )
}

