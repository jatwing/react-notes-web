import { AppBar as MuiAppBar, Toolbar } from '@mui/material';

export const AppBar = (props) => {
  const { children } = props;
  return (
    <MuiAppBar position="fixed">
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          '& .MuiIconButton-root': {
            color: 'inherit',
          },
          '& .MuiIconButton-root .MuiSvgIcon-root': {
            fontSize: '24px',
          },
        }}
      >
        {children}
      </Toolbar>
    </MuiAppBar>
  );
};
