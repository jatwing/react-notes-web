import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { ReactNotesIcon } from 'src/components/data-display/icons';
import { useLocalization } from 'src/redux/i18n/hooks';
import { useProject } from 'src/redux/projects/hooks';

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
      <ReactNotesIcon
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
        {project.isSucceed ? project.entity.title : ''}
      </Typography>
    </Box>
  );
};
