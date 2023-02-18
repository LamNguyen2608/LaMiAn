import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, ChatIcon, StarIcon } from '@chakra-ui/icons'
import React from 'react';
import moment from 'moment';

type IdeaItemProps = {
    // idea: any;
    // userIsCreator: boolean;
    // userVoteValue?: number;
    // onVote: () => {};
    // onDeletePost: () => {};
    // onSelectPost: () => {};
};

const IdeaItem: React.FC<IdeaItemProps> = ({
    // idea,
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
                <Text fontSize="9pt">1702</Text>
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
                            {moment(new Date(12 * 1000)).fromNow()}
                        </Text>
                    </Stack>
                    <Text fontSize="12pt" fontWeight={600}>
                        Shocking!! An bought a 1.2M suit
                    </Text>
                    <Text fontSize="10pt" fontWeight={500}>
                        For his ex-girlfriend's (from grade 5 :D?) birthday held in "Loi Nho Vao Doi",
                        he decided to buy himself a new suit priced at 1.2M even though he refused
                        to buy his dear friend 2 portions of chicken rice. He even considered to buy
                        her a piece of jewelry roughly 1M.
                    </Text>
                    <Flex justify="center" align="center" p={2}>
                        <Image
                            src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/331234073_1211235959523767_3550015648506473687_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=UDABb4d-XYQAX-z9eiF&_nc_oc=AQl7U-A5D7RAJIFBE0oKfZFL15DDJ7VNig1e7pdRJEIsZg-eUObxj-VrsWzlxYs8k7Q&_nc_ht=scontent.fsgn5-5.fna&oh=03_AdTz9yxRelYipQ9rMZaq4RwdKyq3WLQ-xjSfSvdDSNBFTQ&oe=641728B9"
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