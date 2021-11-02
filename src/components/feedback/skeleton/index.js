import { Skeleton } from '@mui/material';

export const SkeletonText = (props) => {
  const { variant, sx } = props;
  switch (variant) {
    case 'word': {
      return (
        <Skeleton
          variant="text"
          sx={{
            width: '2.5em',
            ...sx,
          }}
        />
      );
    }
    case 'secondary': {
      return (
        <Skeleton
          variant="text"
          sx={{
            width: '50%',
            ...sx,
          }}
        />
      );
    }
    case 'primary':
    default: {
      return (
        <Skeleton
          variant="text"
          sx={{
            width: '75%',
            ...sx,
          }}
        />
      );
    }
  }
};

export const SkeletonRectangular = (props) => {
  const { sx } = props;
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        width: '100%',
        height: '256px',
      }}
    />
  );
};
