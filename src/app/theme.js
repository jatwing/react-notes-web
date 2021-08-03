import { StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import { lightTheme } from 'config';

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export { Theme };
