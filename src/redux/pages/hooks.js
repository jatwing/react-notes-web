import { useSelector } from 'react-redux';
import { useRankings } from 'src/redux/rankings/hooks';

import { selectData } from './slice';

export const usePages = () => {
  useRankings();
  return useSelector(selectData);
};
