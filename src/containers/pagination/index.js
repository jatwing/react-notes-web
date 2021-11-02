import { SkeletonText } from 'src/components/feedback/skeleton';
import { SimplePagination } from 'src/components/navigation/pagination';
import { useTranslation } from 'src/redux/i18n/hooks';
import { useAdjacentPages, usePages } from 'src/redux/pages/hooks';

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
  if (!pages.areAvailable || !t) {
    return (
      <SimplePagination
        previousLabel={
          <SkeletonText variant="secondary" sx={{ display: 'inline-block' }} />
        }
        previousPage={{
          name: (
            <SkeletonText variant="primary" sx={{ display: 'inline-block' }} />
          ),
        }}
        nextLabel={
          <SkeletonText variant="secondary" sx={{ display: 'inline-block' }} />
        }
        nextPage={{
          name: (
            <SkeletonText variant="primary" sx={{ display: 'inline-block' }} />
          ),
        }}
      />
    );
  }
  return (
    <SimplePagination
      previousLabel={t('previous')}
      previousPage={
        previousPage
          ? {
              ...previousPage,
              color: getDisciplineColor(previousPage.discipline),
            }
          : null
      }
      nextLabel={t('next')}
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
