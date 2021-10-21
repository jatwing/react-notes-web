
import { Breadcrumbs as MuiBreadcrumbs} from '@mui/material';

import { NavigateNext } from '@mui/icons-material'



export const Breadcrumbs = (props) => {
  const { children, sx } = props;



/**
 * just a few common part
 *
 *
 * we can try to define the style for the text and the link here
 *
 * if MuiLink.root apply the link style,
 * then force all the text to have color text.secondary.
 */



  return <>

      {children}

    </>


}
