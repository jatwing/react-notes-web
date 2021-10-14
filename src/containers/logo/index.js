import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { JatwingIcon } from 'src/components/data-display/icons';
import { useLocalization } from 'src/redux/i18n/hooks';
import { useProject } from 'src/redux/projects/hooks';

export const Logo = (props) => {
  const { sx } = props;
  const project = useProject();
  const l = useLocalization();
  const theme = useTheme();

  console.log(l)
  console.log(project?.entity?.title)

  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <JatwingIcon
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
          ml: '16px',
        }}
      >
        {project.isSucceed ? l(project.entity.title) : ''}
      </Typography>
    </Box>
  );
};
