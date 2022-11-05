import { createTheme } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

const theme = createTheme({
  palette: {
    primary: {
      main: '#5755a1',
    },
    secondary: {
      main: '#7776a3',
    },
    white: '#fff',
    black: '#000'
  },

  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 900,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
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