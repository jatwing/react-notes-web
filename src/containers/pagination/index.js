import { useTranslation } from 'react-i18next';
import { SimplePagination } from 'src/components/navigation/pagination';
import { useAdjacentPages } from 'src/redux/pages/hooks';

const getDisciplineColor = (discipline) => {
  switch (discipline) {
    case 'react': {
      return 'react.dark';
    }
    case 'redux': {
      return 'redux.dark';
    }
    case 'saga': {
      return 'saga.dark';
    }
    default: {
      return 'primary.dark';
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
