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
    children,
    href,
    target = '_blank',
    rel = 'noreferrer noopener',
    onClick,
    sx,
  } = props;
  if (!href) {
    return <Box sx={sx}>{children}</Box>;
  }
  const newProps = {
    ...(isValidHttpUrl(href)
      ? { href, target, rel }
      : { to: href, component: RouterLink }),
    onClick,
    sx: {
      '&.MuiTypography-root': {
        textDecoration: 'none',
        color: 'inherit',
      },
      ...sx,
    },
  };
  return <MuiLink {...newProps}>{children}</MuiLink>;
};

/** link style for typography or component that contains typography */
export const linkStyle = {
  cursor: 'pointer',
  '&.MuiTypography-root, & .MuiTypography-root': {
    textDecoration: 'none',
  },
  '&.MuiTypography-root:hover, &.MuiTypography-root:focus, &:hover .MuiTypography-root, &:focus .MuiTypography-root':
    {
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
