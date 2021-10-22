import { useSelector } from 'react-redux';
import { useRankings } from 'src/redux/rankings/hooks';

import { selectPages, selectPage, selectStatus } from './slice';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'


export const usePages = () => {
  useRankings();
  const status = useSelector(selectStatus)

  useEffect(() => {
    console.log(' can we get the updated state by this?')
  }, [status])


  return useSelector(selectPages);
};

/**
 * do not need a page state actually,
 *
 * directly call useLocation, to get pathname
 * select pages ids and if id match the pathname return the page;
 *
 *
 * TODO we router domain logic can be deleted.
 * finally they do not need to dispatch a strange action.
 */

/**
 * if so,
 * limited by useLocation hook,
 * usePage must be called inside <Router>
 *
 */

export const usePage = () => {
  return useSelector(selectPage);
};
