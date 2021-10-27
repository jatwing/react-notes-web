import { Typography } from '@mui/material';
import { Breadcrumbs as BreadcrumbsComponent } from 'src/components/navigation/breadcrumbs';
import { useSelectedPages } from 'src/redux/pages/hooks';
import { useTranslation  } from 'react-i18next';
import { Link } from 'src/components/navigation/link';

export const Breadcrumbs = (props) => {
  const selectedPages = useSelectedPages();
  const { t } = useTranslation();
  return <BreadcrumbsComponent>
    {selectedPages.map(page => 
    (page.url === '/') ?
    <Link children={t('home')} href='/' key='/' />
:
    <Typography children={page.name} key={page.url} />
  )}
    </BreadcrumbsComponent>
};
