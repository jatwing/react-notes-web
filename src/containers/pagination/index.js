import { SimplePagination } from 'src/components/navigation/pagination';
import { useTranslation } from 'react-i18next';

export const Pagination = () => {
  const { t } = useTranslation();

  const previousPage = {
    name: 'Magic 0000  my name is extremely loong lol',
    url: '/',
    color: 'red',
  };
  const nextPage = {
    name: 'Magic 9999',
    url: '/',
  };

  console.log(t('next') + '1');

  return (
    <SimplePagination
      previousLabel={t('previous')}
      nextLabel={t('next')}
      previousPage={previousPage}
      nextPage={nextPage}
    />
  );
};
