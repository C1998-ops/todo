import { createTheme } from "@mui/material";
import { blue, blueGrey, grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#42a5f5",
      main: "#42a5f5",

      contrastText: "#fff",
      dark: blueGrey[300],
    },
    secondary: {
      light: grey["400"],
      main: grey["700"],
    },
    background: {
      paper: "#fff",
    },
  },
  typography: {
    body1: {
      fontSize: 14,
      fontFamily: "sans-serif",
    },

    button: {
      fontSize: "14px",
    },
  },

  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "15px",
          fontWeight: "500",
          lineHeight: "1.5",
          textDecoration: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          fontSize: "14px",
          minHeight: "50px",
          lineHeight: "1.5",
        },
      },
      defaultProps: {
        fontSize: "14px",
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "15px",
          fontFamily: "monospace",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "white",

          display: "block",
          width: "auto",
          height: "auto",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
        asterisk: {
          order: -1,
          color: "red",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "lightgrey",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "sans-serif",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ":hover": { backgroundColor: "transparent" },
        },
      },
    },
  },
});
