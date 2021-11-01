import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { ReactNotes } from 'src/components/data-display/icons';
import { useProject } from 'src/redux/project/hooks';
import { SkeletonText } from 'src/components/feedback/skeleton';

export const Logo = (props) => {
  const { variant, sx } = props;
  const project = useProject();
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ReactNotes
        variant={variant}
        sx={{
          '&.MuiSvgIcon-root': {
            fontSize: '32px',
          },
        }}
      />
      <Typography
        sx={{
          display: 'inline-block',
          textTransform: 'capitalize',
          whiteSpace: 'nowrap',
          fontFamily: theme.typography.fontFamilies.monospace,
          fontSize: 'htmlFontSize',
          fontWeight: 'fontWeightBold',
          color: variant === 'colorful' ? 'text.secondary' : 'inherit',
          ml: '16px',
        }}
      >
        {project?.entity?.name || <SkeletonText variant="word" />}
      </Typography>
    </Box>
  );
};
