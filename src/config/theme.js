import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: /** 露草色 */ '#3d87c3',
      highlightText: '#ff77ff',
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
