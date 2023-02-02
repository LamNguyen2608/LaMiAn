import { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    height: "20px",
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
    },
  },
  variants: {
    primary: {
      bg: "brand.600",
      _hover: {
        bg: "brand.800",
      },
    },
    secondary: {
      color: "brand.700",
      border: "2px solid",
      borderColor: "brand.700",
      _hover: {
        borderColor: "brand.400",
      },
    },
    authenticate: {
      height: "34px",
      border: "1px solid",
      bg: "brand.100",
      _hover: {
        borderColor: "brand.200",
      },
    },
  },
};
