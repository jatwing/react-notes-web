import { useTranslation } from 'react-i18next';
import { SimplePagination } from 'src/components/navigation/pagination';
import { useAdjacentPages } from 'src/redux/pages/hooks';

const getDisciplineColor = (discipline) => {

//  node.color = node.discipline ? `${node.discipline}.dark` : '';

  return '';
}


export const Pagination = () => {
  const { t } = useTranslation();
  const [previousPage, nextPage] = useAdjacentPages();


  

  return (
    <SimplePagination
      previousLabel={t('previous')}
      nextLabel={t('next')}
      previousPage={previousPage}
      nextPage={nextPage}
    />
  );
};
