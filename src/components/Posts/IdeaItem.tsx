import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, ChatIcon, StarIcon } from '@chakra-ui/icons'
import React from 'react';
import moment from 'moment';
import { Idea } from '@/atoms/ideaAtom';

type IdeaItemProps = {
    idea: Idea;
    // userIsCreator: boolean;
    // userVoteValue?: number;
    // onVote: () => {};
    // onDeletePost: () => {};
    // onSelectPost: () => {};
};

const IdeaItem: React.FC<IdeaItemProps> = ({
    idea,
    // userIsCreator,
    // userVoteValue,
    // onVote,
    // onDeletePost,
    // onSelectPost
}) => {

    return (
        <Flex
            border="1px solid"
            bg="white"
            borderColor="gray.300"
            borderRadius={4}
            _hover={{ borderColor: "gray.500" }}
            cursor='pointer'
            marginBottom={2}
        //onClick={onSelectPost}
        >
            <Flex direction='column'
                align='center'
                bg="gray.100"
                p={2}
                width="40px"
                borderRadius={4}>
                <TriangleUpIcon
                    color="brand.900"
                    fontSize={22}
                    cursor="pointer"
                //  onClick={onVote} 
                />
                <Text fontSize="9pt">{idea.reactions?.length}</Text>
                <TriangleDownIcon
                    color="gray.300"
                    fontSize={22}
                    cursor="pointer"
                //  onClick={onVote} 
                />
            </Flex>
            <Flex direction="column" width="100%">
                <Stack spacing={1} p="10px">
                    <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
                        {/*Home Page Check */}
                        <Text>Posted by LaMiAn {" "}
                            {moment(new Date(12 * 100)).fromNow()}
                        </Text>
                    </Stack>
                    <Text fontSize="12pt" fontWeight={600}>
                        {idea.name}
                    </Text>
                    <Text fontSize="10pt" fontWeight={500}>
                        {idea.body}
                    </Text>
                    <Flex justify="center" align="center" p={2}>
                        <Image
                            src={idea.attached_path}
                            maxHeight="460px" />
                    </Flex>
                </Stack>
                <Flex ml={1} mb={0.5} color="gray.500">
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: "gray.200" }}
                        cursor="pointer">
                        <ChatIcon mr={2} />
                        <Text fontSize="9pt">2023</Text>
                    </Flex>
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: "gray.200" }}
                        cursor="pointer">
                        <StarIcon mr={2} color="gray.300" />
                        <Text fontSize="9pt">Save</Text>
                    </Flex>
                </Flex>

            </Flex>
        </Flex >
    )
}
export default IdeaItem;