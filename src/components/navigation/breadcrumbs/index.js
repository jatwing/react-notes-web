import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

export const Breadcrumbs = (props) => {
  const { children  } = props;
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
