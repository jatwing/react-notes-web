import Prism from 'prismjs'
import { useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";

/**
 * 1. we may call it Code.
 * 2. note the padding, change to container's 40px.
 * 3. can we change the style, with a boolean value (future we will implement dark mode).
 * 4. node that the responsive view may break, can we set the 80 characters rules ??
 *    guess that finally it depends on the contaienr of the Code.
 * 5. after it is added, we may need to change the view of the 'md',
 *    for 'sm', can we allow text to wrap.
 */


export const Highlighter = (props) => {
  const { code } = props;

  // The code snippet you want to highlight, as a string

  const language = 'javascript';

  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );


}
