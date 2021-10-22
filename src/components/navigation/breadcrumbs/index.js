import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

import { NavigateNext } from '@mui/icons-material';

export const Breadcrumbs = (props) => {
  /**
   * pass sx is a good idea or not ?
   *
   *
   */

  const { children, sx } = props;

  /**
   * just a few common part
   *
   *
   * we can try to define the style for the text and the link here
   *
   * if MuiLink.root apply the link style,
   * then force all the text to have color text.secondary.
   */

  return (
    <MuiBreadcrumbs
      children={children}
      separator={<NavigateNext fontSize="small " />}
      aria-label="breadcrumbs"
      sx={{
        color: 'text.secondary',
      }}
    />
  );
};
