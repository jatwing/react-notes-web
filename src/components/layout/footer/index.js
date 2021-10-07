import { Container, Grid, Divider, Box } from '@mui/material';

export const Footer = (props) => {
  const { columns, copyright } = props;
  return (
    <Container
      component="footer"
      sx={{
        '&.MuiContainer-root': {
          px: '40px',
        },
      }}
    >
      <Divider sx={{
        mx: '-40px',
      }}/>
      <Grid container

          sx={{ py:'8px' }}
    >
        {columns?.map((column, index) => (
          <Grid item xs={12} sm={6} md={
            Math.max(Math.trunc(12 / columns.length), 2)
          } key={index} 
          sx={{ 
            '& .MuiListItemText-primary': {

               fontWeight: 'fontWeightBold',
            },
          }}

          >
            {column}
          </Grid>
        ))}

      </Grid>
      <Divider />
      {copyright &&  <Box
          sx={{ 
            py: '16px',
            '& .MuiTypography-root': {
              typography: 'body2',
              color: 'text.secondary'
            } }}>
            {copyright}
      </Box> }
    </Container>
  );
};
