import { useTheme } from '@mui/styles';
import Prism from 'prismjs';
import { useEffect } from 'react';

// import 'prismjs/themes/prism-tomorrow.css';
/**
 * 4. node that the responsive view may break, can we set the 80 characters rules ??
 *    guess that finally it depends on the contaienr of the Code.
 * 5. after it is added, we may need to change the view of the 'md',
 *    for 'sm', can we allow text to wrap.
 */

export const Code = (props) => {
  const { code } = props;
  const theme = useTheme();
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);
  useEffect(() => {
    if (theme?.palatte?.mode === 'dark') {
      require('prismjs/themes/prism-tomorrow.css');
    } else {
      require('prismjs/themes/prism.css');
    }
  }, [theme]);
  return (
    <pre style={{ margin: '0' }}>
      <code className={`language-javascript`}>{code}</code>
    </pre>
  );
};
