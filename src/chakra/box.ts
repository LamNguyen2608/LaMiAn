import { ComponentStyleConfig } from "@chakra-ui/theme";

export const Box: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
  },
  variants: {
    primary: {
      justifyContent: "center",
      p: 2,
      paddingBottom: "28px",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
      height: "20px",
      width: "80px",
      bgGradient: "linear(to-r, brand.900, brand.800)",
      _hover: {
        bgGradient: "linear(to-r, brand.100, brand.200)",
      },
    },
  },
};
