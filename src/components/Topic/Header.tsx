import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { StarIcon } from '@chakra-ui/icons';

type HeaderProps = {
    topicData: any;
};

const Header: React.FC<HeaderProps> = ({ topicData }) => {
    const imageURL = false;
    const isJoined = false; //read from snippet
    return (
        <Flex direction="column" width="100%" height="146px">
            <Box height="50%" bgGradient='linear(to-r, brand.900, brand.800)'></Box>
            <Flex justify="center" flexGrow={1} bg="white">
                <Flex width="95%" maxWidth="860px">
                    {imageURL ? (
                        <Image />
                    ) : (
                        <StarIcon
                            fontSize={60}
                            position="relative"
                            top={-3}
                            bg="blue.500"
                            color="blue.500"
                            border='5px solid white'
                            borderRadius="50%" />
                    )}
                    <Flex padding="10px 16px">
                        <Flex direction='column' mr={6}>
                            <Text fontWeight={800} fontSize="15pt">{topicData.name ? "Yes" : "An's Lies"}</Text>
                            <Text fontWeight={500} color="brand.900" fontSize="9pt">60 ideas</Text>
                        </Flex>
                        <Button
                            variant={isJoined ? "secondary" : "primary"}
                            height="30px"
                            width="80px"
                            pr={6}
                            pl={6}
                            onClick={() => { }}>
                            {isJoined ? "Unfollow" : "Follow"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>

    )
}
export default Header;