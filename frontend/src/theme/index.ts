import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.167,
      letterSpacing: "0em",
    },

    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },

    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: 1.334,
      letterSpacing: "0em",
    },

    h6: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 500,
          borderRadius: '2rem',
          padding: '0.75rem 2rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
        },
      },
    },
  },
});

export default theme;