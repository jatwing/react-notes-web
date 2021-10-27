import { Box, Card, Typography } from '@mui/material';
import { LinkBase } from 'src/components/navigation/link';

export const SimplePagination = (props) => {
  const { previousLabel, nextLabel, previousPage, nextPage } = props;

  if (!previousPage && !nextPage) {
    return <></>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {!previousPage ? (
        <Box
          sx={{
            flexGrow: '1',
            maxWidth: '50%',
            mr: '16px',
          }}
        />
      ) : (
        <LinkBase
          href={previousPage.url ?? '/'}
          sx={{
            flexGrow: '1',
            maxWidth: '50%',
            mr: '16px',
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              textAlign: 'left',
              color: previousPage.color ?? 'text.primary',
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
              children={previousLabel}
              variant="subtitle2"
              sx={{ color: 'text.secondary', mb: '4px' }}
            />
            <Typography
              children={`« ${previousPage.name ?? ''}`}
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
              }}
            />
          </Card>
        </LinkBase>
      )}

      {!nextPage ? (
        <Box
          sx={{
            flexGrow: '1',
            maxWidth: '50%',
          }}
        />
      ) : (
        <LinkBase
          href={nextPage.url ?? ''}
          sx={{
            flexGrow: '1',
            maxWidth: '50%',
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              textAlign: 'right',
              color: nextPage.color ?? 'text.primary',
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
              children={nextLabel}
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
                mb: '4px',
              }}
            />
            <Typography
              children={`${nextPage.name ?? ''} »`}
              variant="subtitle1"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
              }}
            />
          </Card>
        </LinkBase>
      )}
    </Box>
  );
};
