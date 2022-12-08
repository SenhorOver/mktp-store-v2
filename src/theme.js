import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    background: {
      default: 'rgb(242, 244, 245)',
      white: '#fff'
    }
  }
});

export default theme;