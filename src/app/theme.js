import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'config/theme';
import 'config/styles.css';

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
