import { Typography } from '@mui/material';
import { Breadcrumbs as BreadcrumbsComponent } from 'src/components/navigation/breadcrumbs';
import { Link } from 'src/components/navigation/link';
import { useSelectedPages } from 'src/redux/pages/hooks';

export const Breadcrumbs = () => {
  const selectedPages = useSelectedPages();
  return (
    <BreadcrumbsComponent>
      {selectedPages.map((page) =>
        page.url === '/' ? (
          <Link children={page.name} href="/" key="/" />
        ) : (
          <Typography children={page.name} key={page.url} />
        )
      )}
    </BreadcrumbsComponent>
  );
};
