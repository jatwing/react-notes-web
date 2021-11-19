import { Typography } from '@mui/material';
import { SkeletonText } from 'src/components/feedback/skeleton';
import { Breadcrumbs as BreadcrumbsComponent } from 'src/components/navigation/breadcrumbs';
import { Link } from 'src/components/navigation/link';
import { usePages, useSelectedPages } from 'src/redux/pages/hooks';

export const Breadcrumbs = () => {
  const pages = usePages();
  const selectedPages = useSelectedPages();
  if (!pages.areAvailable || selectedPages.length === 0) {
    return (
      <Typography>
        <SkeletonText variant="primary" />
      </Typography>
    );
  }
  return (
    <BreadcrumbsComponent>
      {selectedPages.map((page) =>
        page.url === '/' ? (
          <Link href="/" key="/">
            {page.name}
          </Link>
        ) : (
          <Typography key={page.url}>{page.name}</Typography>
        ),
      )}
    </BreadcrumbsComponent>
  );
};
