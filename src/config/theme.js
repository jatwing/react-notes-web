import { createTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey'

const theme = createTheme({
  /** plan to use grey['100', '300', '500', '700', '900'] somewhere
   *  here we define the potential contrastText color to grey['100'] (white)
   *  or grey['900'] (black)
   *
   *  the contrastText of info is 'rgba(0, 0, 0, 0.87)', others are '#fff'
   *  here we neglect the alpha.
   *
   *  it enable us to use 'grey' consistently with the 'primary' and so on background,
   *
   *  do NOT overdo it, in the context of black text on white background, try to neglect the different white or black.
   */

  palette: {
    primary: {
      main: /** 露草色 */ '#3d87c3',
      contrastText: grey['100'],
    },
    secondary: {
      main: /** 木賊色 */ '#40684f',
      contrastText: grey['100'],
    },
    error: {
      main: /** 茜色 */ '#b13546',
      contrastText: grey['100'],
    },
    warning: {
      main: /** 躑躅色 */ '#dc4473',
      contrastText: grey['100'],
    },
    info: {
      main: /** 向日葵色 */ '#ffba20',
      contrastText: grey['900'],
    },
    success: {
      main: /** 菫色 */ '#654e99',
      contrastText: grey['100'],
    },
  },
  typography: {
    fontFamily: 'Roboto Slab, serif',
    fontStacks: {
      serif: 'Roboto Slab, serif',
      sansSerif: 'Roboto, sans-serif',
      monospace: 'Roboto Mono, monospace',
      cursive: 'cursive',
      fantasy: 'fantasy',
    },
  },
});

export default theme;
