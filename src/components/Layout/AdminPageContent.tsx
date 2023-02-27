import React from "react";
import { Box, Flex } from "@chakra-ui/react";


type AdminPageContentProps = {
    children: React.ReactNode;
};
// Assumes array of two children are passed
const AdminPageContent: React.FC<AdminPageContentProps> = ({children}) => {
  return (
    <Flex
            justify="center"
            align="center"
            p="10px 0px"
            border='1px solid'
            direction="column"
            borderColor='brand.900'>
            <Flex
               p="5px 0px"
               width="97%"
               border='1px solid'
               borderColor='brand.800'>
                <Flex
                    direction="column"
                    width="35%"
                    border='1px solid' borderColor='brand.700'>
                    {children && children[0 as keyof typeof children]}
                </Flex>
                <Flex
                    direction="column"
                    width="70%"
                    border='1px solid black' borderColor='orange.600'
                    ml={2}>
                    {children && children[1 as keyof typeof children]}
                </Flex>
            </Flex>
            <Flex
                p="5px 0px"
                width="97%"
                border='1px solid'
                borderColor='brand.800'>
                <Flex
                    direction="column"
                    width="30%"
                    border='1px solid' borderColor='brand.700'>
                    {children && children[2 as keyof typeof children]}
                </Flex>
                <Flex
                    direction="column"
                    width="30%"
                    border='1px solid black' borderColor='orange.600'
                    ml={2}>
                    {children && children[3 as keyof typeof children]}
                </Flex>
                <Flex
                    direction="column"
                    width="40%"
                    ml={2}
                    border='1px solid' borderColor='orange.700'>
                    {children && children[4 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
  );
};

export default AdminPageContent;
