import { Typography } from '@mui/material';
import { Breadcrumbs as BreadcrumbsComponent } from 'src/components/navigation/breadcrumbs';
import { Link } from 'src/components/navigation/link';
import { useSelectedPages } from 'src/redux/pages/hooks';
import { SkeletonText } from 'src/components/feedback/skeleton';

export const Breadcrumbs = () => {
  const selectedPages = useSelectedPages();
  if (selectedPages.length === 0) {
    return (
      <BreadcrumbsComponent>
        <SkeletonText variant="primary" />;
      </BreadcrumbsComponent>
    );
  }



  return (
    <BreadcrumbsComponent>
      {selectedPages.map((page) =>
        page.url === '/' ? (
          <Link href="/" key="/">
            {page.name || <SkeletonText variant="word" />}
          </Link>
        ) : (
          <Typography key={page.url}>
            {page.name || <SkeletonText variant="word" />}
          </Typography>
        )
      )}
    </BreadcrumbsComponent>
  );
};
