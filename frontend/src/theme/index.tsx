//mui theme settings

import {
  ThemeProvider as MuiThemeProvider,
  Theme,
  alpha,
  createTheme,
  darken,
  lighten,
} from "@mui/material/styles";
import { useMemo } from "react";
import breakpoints from "./breakpoints";
import overrides from "./overrides";
import palette from "./palette";

import typography from "./typography";

const mode = "light" as const;

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useMemo(() => {
    const theme = createTheme({
      typography,
      palette: palette[mode],
      alpha,
      lighten,
      darken,
      shape: {
        borderRadius: 10,
      },
      breakpoints,
    });

    theme.components = overrides(theme) as Theme["components"];

    return theme;
  }, []);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

declare module "@mui/material/styles" {
  type ThemeFunctions = {
    alpha: (color: string, opacity: number) => string;
    darken: (color: string, opacity: number) => string;
    lighten: (color: string, opacity: number) => string;
  };
  export interface ThemeOptions extends ThemeFunctions {
    alpha: typeof alpha;
  }

  interface Theme extends ThemeFunctions {
    alpha: (color: string, opacity: number) => string;
    darken: (color: string, opacity: number) => string;
    lighten: (color: string, opacity: number) => string;
  }
}

export { ThemeProvider };
