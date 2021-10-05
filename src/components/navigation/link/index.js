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


// 1. link without style, button opens url.
export const LinkBase  = (props) => {
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


// maybe create the common sx style here.

const style = {
  sx: { toDO: '1'} 
}


// 2. link without function, text use onClick.
export const LinkStyle = () => {
  // note the component should be replaced by 'span'

  return <></>
}


// 3. complete text   link.
export const Link = () => {

  // maybe we can use the base.


  return <></>
}







// deletet the code below;
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
