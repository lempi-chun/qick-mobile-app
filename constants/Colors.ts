/**
 * Color constants for the Qick mobile app
 * Colors are organized by usage categories and include support for light/dark modes
 */

// Primary brand colors
export const colors = {
  primary: "#141F2B",
  secondary: "#849AB8",
  secondaryOpacity: "rgba(132, 154, 184, 0.1)",
  blackOpacity: "rgba(0, 0, 0, 0.7)",
  selected: "#eceff2",
  transparent: "transparent",
  lime: "#9CFC38",
  red: "#FF4E4D",
  limeTenPercent: "rgba(156, 252, 56, 0.1)",
  limeFortyPercent: "rgba(156, 252, 56, 0.4)",
  limeNinetyPercent: "rgba(156, 252, 56, 0.8)",
  button: "#1F2933",
  buttonTenPercent: "rgba(31, 41, 51, 0.1)",
  footer: "#33C0DB",
  disabledButton: "#2F4B2E",
  disabledText: "#21352C",
  tabbar: "#181818",
  map: "#F14336",
  mapTenPercent: "rgba(241, 67, 54, 0.1)",
  mapFortyPercent: "rgba(241, 67, 54, 0.4)",
  banner: "#661FFE",
  all: "#FCAE38",
  card: "#0C1621",
  star: "#FFCB12",
  starTenPercent: "rgba(255, 203, 18, 0.1)",
  orange: "#FF9212",
  darkGreen: "#047C37",
  clock: "#33C0DB",
  clockTenPercent: "rgba(51, 192, 219, 0.1)",
  clockThirtyPercent: "rgba(51, 192, 219, 0.3)",
  switchTrack: "#1A2D23",
  profileButton: "#333333",
  golden: "#FFCB12",
  light: "#F8F8F8",
  white: "#FFFFFF",
  lightSelected: "#F4F4F5",
  chartblue: "#33C0DB",
  chartyellow: "#FFCB12",
  cancel: "rgba(132, 154, 184, 0.1)",
  lightIconBg: "#D9D9D9",
  lightEventsBg: "#F3F5F8",
  secondaryEightPercent: "rgba(132, 154, 184, 0.08)",
  secondaryTenPercent: "rgba(132, 154, 184, 0.1)",
  secondaryTwentyPercent: "rgba(132, 154, 184, 0.2)",
  secondaryThirtyPercent: "rgba(132, 154, 184, 0.3)",
  secondaryFiftyPercent: "rgba(132, 154, 184, 0.5)",
  green: "rgba(53, 231, 128, 1)",
  black: "black",
  locationtext: "rgba(121, 121, 121, 1)",
  whiteTenPercent: "rgba(255, 255, 255, 0.1)",
  whiteFiftyPercent: "rgba(255, 255, 255, 0.5)",
};

// Theme colors for React Navigation (maintaining compatibility with Expo Router)
const tintColorLight = colors.footer;
const tintColorDark = colors.white;

export const Colors = {
  light: {
    text: colors.primary,
    background: colors.white,
    tint: tintColorLight,
    icon: colors.secondary,
    tabIconDefault: colors.secondary,
    tabIconSelected: tintColorLight,
    card: colors.white,
    border: colors.secondaryTenPercent,
    notification: colors.lime,
  },
  dark: {
    text: colors.white,
    background: colors.primary,
    tint: tintColorDark,
    icon: colors.secondary,
    tabIconDefault: colors.secondary,
    tabIconSelected: tintColorDark,
    card: colors.card,
    border: colors.secondaryTenPercent,
    notification: colors.lime,
  },
};
