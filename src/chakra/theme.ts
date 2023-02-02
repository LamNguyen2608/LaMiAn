// 1. Import `extendTheme`
import "@fontsource/open-sans";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";
import { Box } from "./box";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#2f07ff",
      200: "#ea52b3",
      300: "#ff642c",
      400: "#ffa973",
      500: "#9981ff",
      600: "#71acec",
      700: "#ff9cac",
      800: "#f374f9",
      900: "#9280ff",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button,
    Box,
  },
});
