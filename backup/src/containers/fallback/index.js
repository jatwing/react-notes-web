import { Box, Typography } from '@mui/material';
import { SkeletonText } from 'src/components/feedback/skeleton';

export const Fallback = () => (
  <Box component="article">
    <Typography variant="h2">
      <SkeletonText variant="secondary" />
    </Typography>
    <Typography variant="body1">
      <SkeletonText variant="primary" />
    </Typography>
    <Typography variant="body1">
      <SkeletonText variant="primary" />
    </Typography>
    <Typography variant="body1">
      <SkeletonText variant="primary" />
    </Typography>
  </Box>
);
