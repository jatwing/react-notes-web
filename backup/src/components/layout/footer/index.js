import { Box, Container, Divider, Grid } from '@mui/material';

export const Footer = (props) => {
  const { columns, copyright } = props;
  return (
    <Container
      component="footer"
      sx={{
        '&.MuiContainer-root': {
          px: {
            xs: '24px',
            sm: '32px',
          },
        },
      }}
    >
      <Grid
        container
        sx={{
          py: {
            xs: '12px',
            sm: '16px',
          },
        }}
      >
        {columns?.map((column, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={Math.max(Math.trunc(12 / columns.length), 3)}
            key={index}
            sx={{
              '& .MuiList-root': {
                py: {
                  xs: '12px',
                  sm: '16px',
                },
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
      {copyright && (
        <Box
          sx={{
            py: {
              xs: '24px',
              sm: '32px',
            },
            '& .MuiTypography-root': {
              typography: 'body2',
              color: 'text.secondary',
            },
          }}
        >
          {copyright}
        </Box>
      )}
    </Container>
  );
};
