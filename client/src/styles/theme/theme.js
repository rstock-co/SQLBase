import { createTheme } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

const theme = createTheme({
  palette: {
    primary: {
      main: '#5755a1',
    },
    secondary: {
      main: '#5578a1',
    },
    white: '#fff',
    black: '#000'
  }
});

// Theme.typography.h3 = {
//   fontSize: '1.2rem',
//   '@media (min-width:600px)': {
//     fontSize: '1.5rem',
//   },
//   [Theme.breakpoints.up('md')]: {
//     fontSize: '2rem',
//   },
// };

export default theme;