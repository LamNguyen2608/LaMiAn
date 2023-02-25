import React from 'react';
import { Box, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { Topic } from '@/atoms/topicAtom';

type TopicRHSProps = {
    topicData: Topic
};

const TopicRHS: React.FC<TopicRHSProps> = ({ topicData }) => {

    return (
        <Flex
            border="1px solid"
            bg="white"
            borderColor="gray.300"
            borderRadius={4}
            _hover={{ borderColor: "gray.500" }}
            cursor='pointer'
            direction='column'
            width={300}
            alignItems="center"
        >
            <Box
                textAlign="center"
                color='white'
                fontWeight='bold'
                flex={1}
                fontSize="18px"
                height="50px"
                width="100%"
                bgGradient='linear(to-r, brand.900, brand.800)'
                _hover={{
                    bgGradient: 'linear(to-r, brand.100, brand.200)',
                }}

            >Topic Info</Box>
            <Flex
                direction="column"
                width="100%"
            >
                <Text m={2}>Members: </Text>
                <Text m={2}>Created at: </Text>
                <Text m={2}>Closure date:</Text>
                <Text m={2}>Final closure date: </Text>
            </Flex>

        </Flex>
    )
}
export default TopicRHS;