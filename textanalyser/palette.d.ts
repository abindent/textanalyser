import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    kbd_background?: PaletteOptions["primary"];
    kbd_borderColor?: PaletteOptions["primary"];
    kbd_shadow?: PaletteOptions["primary"];
    kbd_surface?: PaletteOptions["primary"];
  }
}