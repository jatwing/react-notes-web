import { useTheme } from '@mui/styles';
import Prism from 'prismjs';
import { useEffect } from 'react';

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
    <pre
      style={{
        fontSize: theme?.typography?.fontSize,
        padding: '16px',
        margin: '0',
      }}
    >
      <code
        style={{ whiteSpace: 'pre-wrap' }}
        className={'language-javascript'}
      >
        {code}
      </code>
    </pre>
  );
};
