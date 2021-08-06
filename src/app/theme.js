import { StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import { lightTheme } from 'src/config';

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export { Theme };
