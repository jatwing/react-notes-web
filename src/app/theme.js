import { StyledEngineProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import 'config/styles.css';
import theme from 'config/theme';

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export default Theme;
