import { Link as MuiLink } from '@mui/material';
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

export const Anchor = (props) => {
  const { href, target, rel, children, sx, ...otherProps } = props;
  const newProps = {
    children,
    sx: {
      all: 'initial',
      color: 'inherit',
      ...(!href && { pointerEvents: 'none' }),
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
