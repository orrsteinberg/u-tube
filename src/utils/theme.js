const baseTheme = {
  sizes: {
    headerHeight: "9vh",
    decorBarHeight: "3px",
  },
  colors: {
    general: {
      light: "#ffffff",
      dark: "#222222",
      red: "#e82f2f",
      orange: "#e47440",
      blue: "#0b7aff",
      faded: "#5f6d8c",
      accent1: "#9fd1fb",
      accent2: "#ce83f7",
    },
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
};

export const darkTheme = {
  ...baseTheme,
  name: "dark",
  colors: {
    ...baseTheme.colors,
    text: {
      primary: "#d8deed",
      secondary: "#979fb4",
      tertiary: "#707a9c",
    },
    bg: {
      primary: "#101c36",
      secondary: "#2a3658",
      tertiary: "#223054",
      content: "#040912",
    },
  },
};

export const lightTheme = {
  ...baseTheme,
  name: "light",
  colors: {
    ...baseTheme.colors,
    text: {
      primary: "#222222",
      secondary: "#404040",
      tertiary: "#888888",
    },
    bg: {
      primary: "#ffffff",
      secondary: "#e8eeed",
      tertiary: "#eeeeee",
      content: "#f8f8f8",
    },
  },
};
