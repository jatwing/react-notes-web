import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRankings} from 'src/redux/rankings/hooks';


import {
  pagesSelected,
  selectData,
} from './slice';


export const usePagesSelected = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  dispatch(pagesSelected(location.pathname));
};

export const usePages = () => {
  // look like lazy calling
  useRankings();
 //  usePagesSelected();
  return useSelector(selectData);
};
