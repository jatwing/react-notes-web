import { Container, Grid, Divider } from '@mui/material';

export const Footer = (props) => {
  const { logo, columns, copyright } = props;
  const columnWidth =
    columns.length === 0
      ? 0
      : Math.trunc(12 / (columns.length + (!!logo && 1)));
  return (
    <Container
      component="footer"
      sx={{
        '&.MuiContainer-root': {
          p: '40px',
        },
      }}
    >
      <Divider />
      <Grid container>
        {!!logo && (
          <Grid
            item
            xs={12}
            md={12 - columnWidth * columns.length}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: '64px',
              },
            }}
          >
            {logo}
          </Grid>
        )}
        {columns.map((column, index) => (
          <Grid item xs={6} md={columnWidth} key={index}>
            {column}
          </Grid>
        ))}
        {!!copyright && (
          <Grid item xs={12}>
            {copyright}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
