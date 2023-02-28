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
            direction="column"
            >
            <Flex
               p="5px 0px"
               width="97%"
               >
                <Flex
                    direction="column"
                    width="35%"
                    borderRadius='10px'
                    border='3px solid' borderColor='gray.400'>
                    {children && children[0 as keyof typeof children]}
                </Flex>
                <Flex
                    direction="column"
                    width="70%"
                    borderRadius='10px'
                    border='3px solid ' borderColor='gray.400'
                    ml={2}>
                    {children && children[1 as keyof typeof children]}
                </Flex>
            </Flex>
            <Flex
                p="5px 0px"
                width="97%"
                >
                <Flex
                    direction="column"
                    width="30%"
                    borderRadius='10px'
                    border='3px solid' borderColor='gray.400'>
                    {children && children[2 as keyof typeof children]}
                </Flex>
                <Flex
                    direction="column"
                    width="30%"
                    borderRadius='10px'
                    border='3px solid' borderColor='gray.400'
                    ml={2}>
                    {children && children[3 as keyof typeof children]}
                </Flex>
                <Flex
                    direction="column"
                    width="40%"
                    borderRadius='10px'
                    ml={2}
                    border='3px solid' borderColor='gray.400'>
                    {children && children[4 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
  );
};

export default AdminPageContent;
