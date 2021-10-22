import { Box, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs as BreadcrumbsComponent } from 'src/components/navigation/breadcrumbs';
import { usePage } from 'src/redux/pages/hooks';

export const Breadcrumbs = (props) => {
  const { sx } = props;

  const page = usePage();

  console.log(page);

  //
  // do not forget the translation
  const data = [<Typography children={'home'} />];

  /*
   *   Home > Hooks > State Hook
   *
   *
   *  1. Home to '/'.
   *  2. Hooks to force drawer somehow highlight the folder ?
   *  3. State Hook: typography.
   */

  const datadummy = [
    <Typography key="1132" color="text.primary">
      Bre1
    </Typography>,
    <Typography key="sss2" color="text.primary">
      Brea2
    </Typography>,
    <Typography key="dd" color="text.primary">
      Breadc3
    </Typography>,
  ];

  return <BreadcrumbsComponent children={data} />;
};
