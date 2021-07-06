import { createTheme } from '@material-ui/core/styles';

const originalDarkTheme = createTheme({ palette: { mode: 'dark' } });

const lightTheme = createTheme({
  /**
   *
   *  as for the text, material design states that we need to
   *  'create better contrast by
   *  displaying white or black text with reduced opacity.'
   *
   *  @see
   *  https://material.io/design
   *  css file,
   *
   *  the text has primary, secondary and disabled colors,
   *  icon color and hint color are the same as the disabled color.
   *
   *  MUI follows it.
   *
   */

  palette: {
    mode: 'light',
    primary: {
      main: /** 露草色 */ '#3d87c3',
    },
    secondary: {
      main: /** 木賊色 */ '#40684f',
    },
    error: {
      main: /** 茜色 */ '#b13546',
    },
    warning: {
      main: /** 躑躅色 */ '#dc4473',
    },
    info: {
      main: /** 向日葵色 */ '#ffba20',
    },
    success: {
      main: /** 菫色 */ '#654e99',
    },
    contrast: {
      text: originalDarkTheme.palette.text,
      action: originalDarkTheme.palette.action,
      background: originalDarkTheme.palette.background,
      divider: originalDarkTheme.palette.divider,
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

export { lightTheme };
