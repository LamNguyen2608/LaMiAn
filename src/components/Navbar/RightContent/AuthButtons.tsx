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
                fontSize='14px'
                height="35px"
                width="80px"
                borderRadius='60px'
                bgGradient='linear(to-r, brand.900, brand.800)'
                _hover={{
                    bgGradient: 'linear(to-r, brand.100, brand.200)',
                    color: "grey"
                }}
            >
                Log In
            </Box>
            <Box
                alignItems="center"
                as='button'
                color='white'
                fontWeight='bold'
                fontSize='14px'
                height="35px"
                width="80px"
                borderRadius='60px'
                bgGradient='linear(to-r, brand.900, brand.800)'
                _hover={{
                    bgGradient: 'linear(to-r, brand.100, brand.200)',
                }}
            >
                <Box
                    position="relative"
                    left="2px"
                    paddingTop="5px"
                    paddingLeft="2px"
                    textAlign="center"
                    bg="black"
                    borderRadius='60px'
                    height="31px"
                    width="76px"
                    _hover={{
                        color: "grey"
                    }}>
                    Sign Up
                </Box>
            </Box>
        </>
    )
}
export default AuthButtons;