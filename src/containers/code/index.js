// they are ground truth
// call them from lib is suitable or not ?


import { pageItemsUrlsAndCodes } from 'src/lib/pages';
import { useLocation } from 'react-router-dom'

import { Highlighter } from 'src/components/data-display/highlighter'


export const Code = () => {

  const location  = useLocation();
  const code = pageItemsUrlsAndCodes[location.pathname];


  return (
    <>
      < Highlighter code={code} />
    </>
  )


}
