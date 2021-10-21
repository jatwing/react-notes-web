import { Box,  Typography ,Breadcrumbs as MuiBreadcrumbs} from '@mui/material';
import { NavigateNext } from '@mui/icons-material'

export const Breadcrumbs = (props) => {
  const { sx } = props;



  /*
   *   Home > Hooks > State Hook
   *  
   *
   *  1. Home to '/'.
   *  2. Hooks to force drawer somehow highlight the folder ?
   *  3. State Hook: typography.
   */




  // to use the sx
  //
  //
  
  const data = [

     <Typography key="1132" color="text.primary">
      Bre1
    </Typography>,
 <Typography key="sss2" color="text.primary">
      Brea2
    </Typography>,
     <Typography key="dd" color="text.primary">
      Breadc3
    </Typography>,


    ]


  return (
    <Box sx={{ ...sx }}>
    <MuiBreadcrumbs 
      children={data}
      separator={<NavigateNext fontSize="small "/>}
      aria-label="breadcrumbs"
      
    />
    </Box>
  )
}
