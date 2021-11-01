import { useTranslation } from 'react-i18next';
import { SimplePagination } from 'src/components/navigation/pagination';
import { useAdjacentPages } from 'src/redux/pages/hooks';

const getDisciplineColor = (discipline) => {
  switch (discipline) {
    case 'react':
    case 'redux':
    case 'saga': {
      return discipline;
    }
    default: {
      return 'primary';
    }
  }
};

export const Pagination = () => {
  const { t } = useTranslation();
  const [previousPage, nextPage] = useAdjacentPages();
  return (
    <SimplePagination
      previousLabel={t('previous')}
      nextLabel={t('next')}
      previousPage={
        previousPage
          ? {
              ...previousPage,
              color: getDisciplineColor(previousPage.discipline),
            }
          : null
      }
      nextPage={
        nextPage
          ? {
              ...nextPage,
              color: getDisciplineColor(nextPage.discipline),
            }
          : null
      }
    />
  );
};
