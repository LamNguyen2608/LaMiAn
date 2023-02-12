import { color, border, Center } from "@chakra-ui/react";
import { ComponentStyleConfig } from "@chakra-ui/theme";
import { start } from "repl";

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
      
      alignItems:"center",
      color:'white',
      fontWeight:'bold',
      fontSize:"15px",
      height:"25px",
      width:"80%",
      borderRadius:'60px',
      bgGradient:'linear(to-r, brand.900, brand.800)',
      _hover:{
          bgGradient: 'linear(to-r, brand.100, brand.200)',
          color: "grey",
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
      borderColor:"gray.400",
      _hover: {
        border:"2px solid", 
        borderColor: "brand.900",
      },
    },
  },
};
