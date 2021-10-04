
/**
 * solution may be:
 *
 * creating useable link component based on the @mui link
 *
 * the validation and component similar to Anchor
 *
 * but directly write the style inside
 *
 */


import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';



// remove Duplicated code
const isValidHttpUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    const schemes = ['http:', 'https:', 'mailto:'];
    return schemes.includes(url.protocol);
  } catch (error) {
    return false;
  }
};

export const TestLink  = (props) => {
  const { href, target, rel, children, sx, ...otherProps } = props;
  const newProps = {
    children,
    sx: {
      '&.MuiLink-root': {
        textDecoration: 'none'
      },
      '&.MuiLink-root:hover': {
        textDecoration: 'underline',
        textDecorationColor: 'currentColor'
        // cannot use current color hree
      },

      ...sx,
    },
    ...otherProps,
  };
  if (isValidHttpUrl(href)) {
    newProps.href = href;
    newProps.target = target ?? '_blank';
    newProps.rel = rel ?? 'noreferrer noreferrer';
  } else {
    newProps.to = href;
    newProps.component = RouterLink;
  }
  return <MuiLink {...newProps} />;
};
