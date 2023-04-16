import { useTheme } from 'next-themes';
import { GlobalStyles, CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, globalStyles, lightTheme } from './theme';

function MUIThemeProvider({ children }) {
  const { theme } = useTheme();
  const currentTheme = (theme === 'light' ? lightTheme : darkTheme);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
}

export default MUIThemeProvider;
