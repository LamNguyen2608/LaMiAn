import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, ChatIcon, StarIcon } from '@chakra-ui/icons'
import { RiShareForwardLine } from 'react-icons/ri'
import React from 'react';
import moment from 'moment';
import { Idea, myVote } from '@/atoms/ideaAtom';
import useIdeas from '@/hooks/useIdeas';
import { useRouter } from 'next/router';

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
    const { ideaStateValue, setIdeaStateValue, onVote } = useIdeas();
    const isVoted: myVote | undefined = ideaStateValue.IdeaVotes.find(
        (item) => (item.idea_id === idea.id)
    );
    const router = useRouter();
    const { topicId, ideaid } = router.query;
    console.log("Idea ID: " + idea.id + "====> is vote: " + isVoted);
    return (
        <Flex
            border="1px solid"
            bg="white"
            borderColor="gray.300"
            borderRadius={4}
            _hover={{ borderColor: "gray.500" }}
            cursor='pointer'
            marginBottom={2}
            onClick={() => {
                if (!ideaid) {
                    setIdeaStateValue((prev) => ({
                        ...prev,
                        selectedIdea: idea
                    }))
                    router.push('/topic/' + '1' + '/ideas/' + idea.id)
                }
            }}
        >
            <Flex direction='column'
                align='center'
                bg="gray.100"
                p={2}
                width="40px"
                borderRadius={4}>
                <TriangleUpIcon
                    color={isVoted?.reaction ? "brand.900" : "gray.300"}
                    fontSize={22}
                    cursor="pointer"
                    onClick={event => {
                        if (isVoted?.reaction === true) {
                            console.log("remove up vote");
                            onVote(event, idea, {
                                idea_id: idea.id,
                                reaction: null
                            })
                        }
                        else {
                            console.log("add up vote")
                            onVote(event, idea, {
                                idea_id: idea.id,
                                reaction: true
                            })
                        }
                    }}
                />
                <Text fontSize="9pt">{idea.reactions?.filter((item) => item.reaction === true).length}</Text>
                <TriangleDownIcon
                    color={isVoted?.reaction === false ? "brand.900" : "gray.300"}
                    fontSize={22}
                    cursor="pointer"
                    onClick={event => {
                        if (isVoted?.reaction === false) {
                            console.log("remove down vote");
                            onVote(event, idea, {
                                idea_id: idea.id,
                                reaction: false
                            })
                        }
                        else {
                            console.log("add down vote");
                            onVote(event, idea, {
                                idea_id: idea.id,
                                reaction: null
                            })
                        }
                    }}
                />
                <Text fontSize="9pt">{idea.reactions?.filter((item) => item.reaction === false).length}</Text>
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
                        <Text fontSize="9pt">{idea.comments.length}</Text>
                    </Flex>
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: "gray.200" }}
                        cursor="pointer">
                        <RiShareForwardLine width={3} color="gray.300" />
                        <Text marginLeft={2} fontSize="9pt">Share</Text>
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