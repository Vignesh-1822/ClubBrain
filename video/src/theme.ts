import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const theme = {
  bg: "#000000",
  panel: "#1A1A1A",
  panelLight: "#242424",
  accent: "#EEF29B",
  text: "#FFFFFF",
  muted: "#8A8A8A",
  radius: 28,
  font: `${fontFamily}, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`,
} as const;

export const FPS = 30;
