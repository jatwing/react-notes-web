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

/** anchor without style */
export const AnchorBase = (props) => {
  const {
    href,
    target = '_blank',
    rel = 'noreferrer noopener',
    children,
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

/** anchor style for typography or component that contains typography */
export const anchorStyle = {
  cursor: 'pointer',
  '&.MuiTypography-root': {
    textDecoration: 'none',
  },
  '&:hover.MuiTypography-root, &:focus.MuiTypography-root, &:hover .MuiTypography-root, &:focus .MuiTypography-root': {
    textDecoration: 'underline',
    textDecorationColor: 'currentColor',
  },
  '&:active.MuiTypography-root, &:active .MuiTypography-root': { 
    textDecoration: 'none',
   // color: 'text.disabled',
    opacity: theme => theme.palette.action.activatedOpacity,
  },
};

/** span with anchor style */
export const AnchorStyle = (props) => {
  const { children, sx } = props;
  const newProps = {
    children,
    sx: {
      ...anchorStyle,
      ...sx,

    },
  };
  return <Box component="span" {...newProps} />;
};

/** anchor with style */
export const Anchor = (props) => {
  const { sx, ...otherProps } = props;
  const newProps = {
    sx: {
      ...anchorStyle,
      ...sx,
    },
    ...otherProps,
  };
  return <AnchorBase {...newProps} />;
};
