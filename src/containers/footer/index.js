import { 
  AppBar,
  Toolbar,
  Link
} from '@mui/material'


/**
 * it seems that in this package,
 * wrap app-bar does not make sense,
 *
 * try header, footer maybe,
 *
 * or do not write a general component.
 */



export const Footer = () => {


  return (


    <AppBar position="static">
      <Toolbar>

          {' footer copyright ...'}
      </Toolbar>
    </AppBar>



  )

}
