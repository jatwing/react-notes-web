import { Box, Card, Typography } from '@mui/material';
import { LinkBase } from 'src/components/navigation/link';

const PaginationCard = (props) => {
  const { page, label } = props;
  if (!page) {
    return (
      <Box
        sx={{
          flex: '1 0',
          maxWidth: '50%',
        }}
      />
    );
  }
  return (
    <LinkBase
      href={page.url ?? '/'}
      sx={{
        flex: '1 0',
        maxWidth: '50%',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          color: page.color ?? 'primary.main',
          p: '16px',
          '&:hover': {
            borderColor: 'currentcolor',
            '& > .MuiTypography-subtitle1': {
              color: 'currentcolor',
            },
          },
        }}
      >
        <Typography
          children={label}
          variant="subtitle2"
          component="h6"
          sx={{ color: 'text.secondary', mb: '4px' }}
        />
        <Typography
          children={page.name ? `« ${page.name}` : '«'}
          variant="subtitle1"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        />
      </Card>
    </LinkBase>
  );
};

export const SimplePagination = (props) => {
  const { previousLabel, nextLabel, previousPage, nextPage } = props;
  if (!previousPage && !nextPage) {
    return <></>;
  }
  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        '& > .MuiLink-root:nth-child(2)': {
          textAlign: 'right',
          ml: '16px'
        },
      }}
    >
      <PaginationCard page={previousPage} label={previousLabel} />
      <PaginationCard page={nextPage} label={nextLabel} />
    </Box>
  );
};
