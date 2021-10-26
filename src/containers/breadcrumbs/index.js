import { Typography } from '@mui/material';
import { Breadcrumbs as BreadcrumbsComponent } from 'src/components/navigation/breadcrumbs';
import { useSelectedPages } from 'src/redux/pages/hooks';

export const Breadcrumbs = (props) => {
  const selectedPages = useSelectedPages();

  //
  // do not forget the translation
  const data = [<Typography children={'home'} key="test" />];

  /*
   *   Home > Hooks > State Hook
   *
   *
   *  1. Home to '/'.
   *  2. Hooks to force drawer somehow highlight the folder ?
   *  3. State Hook: typography.
   */

  return <BreadcrumbsComponent children={data} />;
};
