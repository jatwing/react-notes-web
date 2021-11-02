import { Typography } from '@mui/material';
import { createElement } from 'react';
import { SkeletonText } from 'src/components/feedback/skeleton';
import { Breadcrumbs as BreadcrumbsComponent } from 'src/components/navigation/breadcrumbs';
import { Link } from 'src/components/navigation/link';
import { usePages, useSelectedPages } from 'src/redux/pages/hooks';

export const Breadcrumbs = () => {
  const pages = usePages();
  const selectedPages = useSelectedPages();
  if (!pages.areAvailable || selectedPages.length === 0) {
    return <Typography children={<SkeletonText variant="primary" />} />;
  }
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
