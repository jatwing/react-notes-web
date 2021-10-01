import { AppBar as MuiAppBar
  , Toolbar } from '@mui/material'

export const AppBar = (props) => {
  const { slots } = props;
  return (
    <MuiAppBar position="sticky" >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        { slots }
      </Toolbar>
    </MuiAppBar>
  )
}
