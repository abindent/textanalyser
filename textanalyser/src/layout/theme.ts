// MUI THEME
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
    cssVarPrefix: "osc",
  },
  colorSchemes: {
    light: {
      palette: {
        kbd_background: {
          main: "#DDE7EE",
        },
        kbd_surface: {
          main: "#FCFCFD",
        },
        kbd_borderColor: { main: "#CDD7E1" },
        kbd_shadow: {
          main: "var(--osc-kbdshadowRing, 0 0 #000), 0px 1px 2px 0px rgba(var(--osc-palette-kbd-shadow-rgb, 21 21 21)/ var(--osc-palette-kbd-shadow-opacity, 0.08))",
        },
      },
    },
    dark: {
      palette: {
        kbd_background: {
          main: "#32383E",
        },
        kbd_surface: {
          main: "#121416",
        },
        kbd_borderColor: { main: "#32383E" },
        kbd_shadow: {
          main: "var(--osc-kbdshadowRing, 0 0 #000), 0px 1px 2px 0px rgba(var(--osc-palette-kbd-shadow-rgb, 21 21 21)/ var(--osc-palette-kbd-shadow-opacity, 0.08))",
        },
      },
    },
  },
  typography: {
    kbd: {
      background:
        "linear-gradient(to top, var(--osc-palette-kbd_background-main), var(--osc-palette-kbd_surface-main))",

      border: "1px solid var(--osc-palette-kbd_borderColor-main)",
      borderRadius: "2px",
      boxShadow: "var(--osc-palette-kbd_shadow-main)",
      padding: "0.125em 0.375em",
      fontSize: "0.95rem",
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Lexend",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const MUI_THEME = responsiveFontSizes(theme);

export default MUI_THEME;
