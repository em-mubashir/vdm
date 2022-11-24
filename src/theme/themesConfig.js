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
const lightText = {
  primary: "rgb(17, 24, 39)",
  secondary: "rgb(107, 114, 128)",
  disabled: "rgb(149, 156, 169)",
};

const darkText = {
  primary: "rgb(229, 231, 235)",
  secondary: "rgb(255,255,255)",
  disabled: "rgb(156, 163, 175)",
};
const darkText2 = {
  primary: "rgb(229, 231, 235)",
  secondary: "rgb(255,255,255)",
  disabled: "rgb(156, 163, 175)",
};

const themesConfig = {
  defaultDark: {
    palette: {
      mode: "dark",
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
    status: {
      danger: "orange",
    },
    customColors: {
      lightPurple: "#d8b4fe",
      button: { main: "#0671cd", dark: "#0560ad" },
      button2: { main: "#9e43ff", dark: "#902bfc" },
      chartColors2: {
        upDown: [chartColors.green, chartColors.red],
        upDownLaeeq: [deepPurple[500], chartColors.red],
      }, //chartColors.green
      chartColors: { upDown: [blue[800], deepPurple[500]] },
    },
  },
};

export default themesConfig;
