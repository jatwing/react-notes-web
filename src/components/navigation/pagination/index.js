import { Box, Button, Typography } from '@mui/material';
import { LinkBase } from 'src/components/navigation/link';

const PaginationCard = (props) => {
  const { type, label, page } = props;
  if (!page) {
    return (
      <Box
        sx={{
          flex: '1 0',
          maxWidth: '50%',
          ...(type === 'previous' && { mr: '16px' }),
        }}
      />
    );
  }
  const color = page.color || 'primary';
  return (
    <LinkBase
      href={page.url}
      sx={{
        flex: '1 0',
        maxWidth: '50%',
        ...(type === 'previous' && { mr: '16px' }),
      }}
    >
      <Button
        variant="outlined"
        color={color}
        sx={{
          display: 'block',
          height: '100%',
          width: '100%',
          textAlign: type === 'previous' ? 'left' : 'right',
          textTransform: 'none',
          borderColor: 'text.disabled',
          p: '16px',
          '&:hover, &:focus': {
            borderColor: `${color}.dark`,
            '& > .MuiTypography-subtitle1': {
              color: `${color}.dark`,
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
          variant="subtitle1"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            '&::before': {
              content: type === 'previous' ? "'« '" : "''",
            },
            '&::after': {
              content: type === 'next' ? "' »'" : "''",
            },
          }}
        >
          {page.name}
        </Typography>
      </Button>
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
