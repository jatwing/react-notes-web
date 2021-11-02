import { useTranslation } from 'src/redux/i18n/hooks';
import { SkeletonText } from 'src/components/feedback/skeleton';
import { SimplePagination } from 'src/components/navigation/pagination';
import { usePages, useAdjacentPages } from 'src/redux/pages/hooks';

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
  const t = useTranslation();
  const pages = usePages();
  const [previousPage, nextPage] = useAdjacentPages();
  return t && pages.isAvailable ? (
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
  ) : (
    <>{'need to handle the link'}</>
  );
};
