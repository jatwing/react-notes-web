import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'config/theme';
import './styles.css';
import 'config/fonts.css';

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
