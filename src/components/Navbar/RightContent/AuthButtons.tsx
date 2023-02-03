import { Box, Button } from '@chakra-ui/react';
import React from 'react';


const AuthButtons: React.FC = () => {

    return (
        <>
            <Box
                mr={1}
                alignItems="center"
                as='button'
                color='white'
                fontWeight='bold'
                fontSize={{ base: "11px", sm: "13px" }}
                height="30px"
                display={{ base: "none", sm: "block" }}
                width={{ base: "60px", sm: "110px" }}
                borderRadius='60px'
                bgGradient='linear(to-r, brand.900, brand.800)'
                _hover={{
                    bgGradient: 'linear(to-r, brand.100, brand.200)',
                }}

            >
                <Box
                    position="relative"
                    left="2px"
                    paddingTop={{ base: "5px", sm: "3px" }}
                    paddingLeft="2px"
                    textAlign="center"
                    bg="black"
                    borderRadius='60px'
                    height="26px"
                    width={{ base: "56px", sm: "106px" }}
                    _hover={{
                        color: "grey"
                    }}>
                    Log In
                </Box>
            </Box>
            <Box
                display={{ base: "none", sm: "block" }}
                alignItems="center"
                as='button'
                color='white'
                fontWeight='bold'
                fontSize={{ base: "11px", sm: "13px" }}
                height="30px"
                width={{ base: "60px", sm: "110px" }}
                borderRadius='60px'
                bgGradient='linear(to-r, brand.900, brand.800)'
                _hover={{
                    bgGradient: 'linear(to-r, brand.100, brand.200)',
                    color: "grey"
                }}
            >
                Sign Up
            </Box>
        </>
    )
}
export default AuthButtons;