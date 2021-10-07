import { Box, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const isValidHttpUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    const schemes = ['http:', 'https:', 'mailto:'];
    return schemes.includes(url.protocol);
  } catch (error) {
    return false;
  }
};

/** link without style */
export const LinkBase = (props) => {
  const {
    href,
    children,
    target = '_blank',
    rel = 'noreferrer noopener',
    sx,
  } = props;
  if (!href) {
    return <Box children={children} sx={sx} />;
  }
  const newProps = {
    children,
    ...(isValidHttpUrl(href)
      ? { href, target, rel }
      : { to: href, component: RouterLink }),
    sx: {
      '&.MuiTypography-root': {
        textDecoration: 'none',
        color: 'inherit',
      },
      ...sx,
    },
  };
  return <MuiLink {...newProps} />;
};

/** link style for typography or component that contains typography */
export const linkStyle = {
  cursor: 'pointer',
  '&.MuiTypography-root, & .MuiTypography-root': {
    textDecoration: 'none',
  },
  '&.MuiTypography-root:hover, &.MuiTypography-root:focus, &:hover .MuiTypography-root, &:focus .MuiTypography-root': {
    textDecoration: 'underline',
    textDecorationColor: 'currentColor',
  },
  '&.MuiTypography-root:active, &:active .MuiTypography-root': { 
    textDecoration: 'none',
  },
};

/** link with style */
export const Link = (props) => {
  const { sx, ...otherProps } = props;
  const newProps = {
    sx: {
     ...linkStyle,
     ...sx,
    },
    ...otherProps,
  };
  return <LinkBase {...newProps} />;
};
