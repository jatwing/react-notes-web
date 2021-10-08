import { Container, Grid, Divider, Box } from '@mui/material';

export const Footer = (props) => {
  const { columns, copyright } = props;
  return (
    <Container
      component="footer"
      sx={{
        '&.MuiContainer-root': {
          px: '24px',
        },
      }}
    >
      <Grid container

          sx={{ py:'12px' }}
    >
        {columns?.map((column, index) => (
          <Grid item xs={12} sm={6} md={
            Math.max(Math.trunc(12 / columns.length), 2)
          } key={index} 
          sx={{ 
            '& .MuiList-root': {
              py: '12px',
            },
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
            py: '24px',
            '& .MuiTypography-root': {
              typography: 'body2',
              color: 'text.secondary'
            } }}>
            {copyright}
      </Box> }
    </Container>
  );
};
