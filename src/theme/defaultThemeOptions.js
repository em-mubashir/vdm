import {
  lightBlue,
  red,
  yellow,
  deepPurple,
  green,
  teal,
  pink,
  purple,
  orange,
  deepOrange,
  blue,
  lime,
  amber,
} from "@mui/material/colors";

const fuseDark = {
  50: "#e5e6e8",
  100: "#bec1c5",
  200: "#92979f",
  300: "#666d78",
  400: "#464e5b",
  500: "#252f3e",
  600: "#212a38",
  700: "#1b2330",
  800: "#161d28",
  900: "#0d121b",
  A100: "#5d8eff",
  A200: "#2a6aff",
  A400: "#004af6",
  A700: "#0042dd",
  contrastDefaultColor: "light",
};
const darkText = {
  primary: "rgb(229, 231, 235)",
  secondary: "rgb(255,255,255)",
  disabled: "rgb(156, 163, 175)",
};
export const defaultThemeOptions = {
  palette: {
    text: darkText,
    primary: fuseDark,
    secondary: {
      light: blue[200],
      main: blue[700],
      dark: blue[900],
    },
    third: {
      light: deepPurple[100],
      main: deepPurple[300],
      dark: deepPurple[700],
    },
    fourth: {
      light: orange[300],
      main: orange[500],
      dark: orange[900],
    },
    button: {
      light: "#02b1eb",
      main: blue[800],
      dark: "#0076ba",
    },
    background: {
      // #1E2125
      paper: "#151a1e",
      default: "#121212",
    },
    error: red,
  },
  typography: {
    fontFamily: [
      "Comfortaa",
      '"Helvetica"',
      "Inter var",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "18px",
        },
        sizeSmall: {
          borderRadius: "15px",
        },
        sizeLarge: {
          borderRadius: "21px",
        },
        contained: {
          boxShadow: "none",
          "&:hover, &:focus": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        contained: {
          borderRadius: 18,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          overflow: "hidden",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 100px #212629 inset",
            "-webkit-text-fill-color": "#fff",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "16px",

          // background: '#2b5876',
          // backgroundImage: 'linear-gradient(93deg, rgba(37,47,62,1) 0%, rgba(21,26,30,1) 100%)',
          // backgroundImage: '-webkit-linear-gradient(93deg, rgba(37,47,62,1) 0%, rgba(21,26,30,1) 100%)'

          border: "2px solid rgba(21, 26, 30, 0.9)",

          // =========================
          // background: 'hsla(228, 5%, 21%, 1)',
          // backgroundImage:
          //     'linear-gradient(45deg, hsla(228, 5%, 21%, 1) 0%, hsla(274, 41%, 47%, 1) 28%, hsla(268, 18%, 27%, 1) 49%, hsla(270, 24%, 30%, 1) 57%, hsla(273, 35%, 39%, 1) 86%, hsla(274, 44%, 50%, 1) 100%, hsla(274, 43%, 49%, 1) 100%)',

          // backgroundImage:
          //     '-moz-linear-gradient(45deg, hsla(228, 5%, 21%, 1) 0%, hsla(274, 41%, 47%, 1) 28%, hsla(268, 18%, 27%, 1) 49%, hsla(270, 24%, 30%, 1) 57%, hsla(273, 35%, 39%, 1) 86%, hsla(274, 44%, 50%, 1) 100%, hsla(274, 43%, 49%, 1) 100%)',

          // backgroundImage:
          //     '-webkit-linear-gradient(45deg, hsla(228, 5%, 21%, 1) 0%, hsla(274, 41%, 47%, 1) 28%, hsla(268, 18%, 27%, 1) 49%, hsla(270, 24%, 30%, 1) 57%, hsla(273, 35%, 39%, 1) 86%, hsla(274, 44%, 50%, 1) 100%, hsla(274, 43%, 49%, 1) 100%)',
          // ====================================================
          // background: 'rgb(59,59,61)',
          // backgroundImage: 'linear-gradient(90deg, rgba(59,59,61,1) 0%, rgba(49,49,108,1) 100%, rgba(0,212,255,1) 100%)',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          "&:before, &:after": {
            display: "none",
          },
        },
      },
    },
    MuiSlider: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "secondary",
      },
    },
  },
};
