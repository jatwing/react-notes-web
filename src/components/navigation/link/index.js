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

/**
 * find a way to combine Anchor and Link
 *
 * how about 
 *
 * 1. Link Function (link to url) , button opens url.
 * 2. Link Style (for text underline and color), text opens dialog.
 * 3. Combined, original a or MuiLink, text opens url.
 *    even only case 3, need to consider replacing the component.
 */

export const TestLink = (props) => {
  const { href, target, rel, children, sx, ...otherProps } = props;
  const newProps = {
    children,
    sx: {
      '&.MuiLink-root': {
        textDecoration: 'none',
      },
      '& .MuiTypography-root': {
        textDecoration: 'none',
      },
      '&:hover .MuiTypography-root, &:focus .MuiTypography-root': {
        textDecoration: 'underline',
        textDecorationColor: 'currentColor',
      },
      '&:active .MuiTypography-root': {
        textDecoration: 'none',
        // not very genral, consider opacity
        color: 'secondary.main',
      },
      ...sx,
    },
    ...otherProps,
  };
  if (isValidHttpUrl(href)) {
    newProps.href = href;
    newProps.target = target ?? '_blank';
    newProps.rel = rel ?? 'noreferrer noopener';
  } else {
    newProps.to = href;
    newProps.component = RouterLink;
  }
  return <MuiLink {...newProps} />;
};
