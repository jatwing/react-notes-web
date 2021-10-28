import { Box, Card, Typography } from '@mui/material';
import { LinkBase } from 'src/components/navigation/link';

const PaginationCard = (props) => {
  const { type, label, page } = props;
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
        ...(type === 'next' && { textAlign: 'right', ml: '16px' }),
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
          children={
            (type === 'previous' ? '« ' : '') +
            (page.name ?? '') +
            (type === 'next' ? ' »' : '')
          }
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
      }}
    >
      <PaginationCard
        type="previous"
        label={previousLabel}
        page={previousPage}
      />
      <PaginationCard type="next" label={nextLabel} page={nextPage} />
    </Box>
  );
};
