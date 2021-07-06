import { StyledEngineProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import 'config/styles.css';
import { lightTheme  } from 'config/theme';

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export default Theme;
