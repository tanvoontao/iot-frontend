import { createTheme, css } from '@mui/material/styles';

/*
color palette:

:root {
    --blue1: #00A6F1;
    --blue2: #007DD7;
    --blue3: #005AC1;
    --blue4: #003D95;

    --black1: #000000;
    --gray1: #E5E5E5;
    --white1: #FFFFFF;
}
*/

export const lightTheme = createTheme({
  palette: {
    primary: { main: '#003D95' },
    secondary: { main: '#E5E5E5' },
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: '#00A6F1' },
    secondary: { main: '#003D95' },
    mode: 'dark',
  },
});

export const globalStyles = css`
    :root {
      body {
        background-color: #ffffff;
        color: #121212;
      }
    }
    [class="dark"] {
      body {
        background-color: #03071e;
        color: #E5E5E5;
      }
    }
  `;

// data-theme="dark"
