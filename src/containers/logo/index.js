import { JatwingIcon } from 'src/components/data-display/icons'
import { Typography, Box } from '@mui/material'
import { useProject  } from 'src/redux/projects/hooks'
import { useLocalization } from 'src/redux/i18n/hooks'
import { useTheme } from '@mui/styles'


// Logo = Icon + Text

export const Logo = () => {
  const project = useProject();
  const l = useLocalization();
  const theme = useTheme();
  return (
    <Box sx={{
      p: '8px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <JatwingIcon 
          sx={{ 
            '&.MuiSvgIcon-root': {
              fontSize: '32px',
            } 
          }}
      />
      <Typography sx={{ 
        display: 'inline-block',
        textTransform: 'capitalize',
        fontFamily: theme.typography.fontFamilies.monospace,
        fontSize: 'htmlFontSize',
        fontWeight: 'fontWeightBold',
        ml: '8px',
      }}>{ project.isSucceed ? l(project.entity.title) : ''   }</Typography>
    </Box>
  )
}

