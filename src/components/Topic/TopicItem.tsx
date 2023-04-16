import {
  Badge,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChatIcon,
  StarIcon,
} from '@chakra-ui/icons';
import { RiShareForwardLine } from 'react-icons/ri';
import React from 'react';
import moment from 'moment';
import { Idea, myVote } from '@/atoms/ideaAtom';
import useIdeas from '@/hooks/useIdeas';
import { useRouter } from 'next/router';
import { auth } from '@/Firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Topic } from '@/atoms/topicAtom';

const badgeColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
  'linkedin',
  'facebook',
  'messenger',
  'whatsapp',
  'twitter',
  'telegram',
];

type TopicItemProps = {
  topic: Topic;
  index: number;
  // userIsCreator: boolean;
  // userVoteValue?: number;
  // onVote: () => {};
  // onDeletePost: () => {};
  // onSelectPost: () => {};
};


const IdeaItem: React.FC<TopicItemProps> = ({ topic, index }) => {
  function Status() {
    if (new Date(topic.topic_closure_date).getTime() > new Date().getTime())
      return (
        <>
          <Text color="green" fontSize="10px">
            Status: Open
          </Text>
        </>
      );
    if (new Date(topic.topic_closure_date).getTime() < new Date().getTime() && new Date().getTime() < new Date(topic.final_closure_date).getTime())
      return (
        <>
          <Text color="#FFC300" fontSize="10px">
            Status: Closed for creating new ideas
          </Text>
        </>
      );
    if (new Date().getTime() > new Date(topic.final_closure_date).getTime())
      return (
        <>
          <Text color="red" fontSize="10px">
            Status: Final Close
          </Text>
        </>
      );
  };

  const { ideaStateValue, setIdeaStateValue } = useIdeas();
  const router = useRouter();
  const [user, loadingUser] = useAuthState(auth);
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: 'gray.500' }}
      cursor="pointer"
      onClick={() => {
        router.push('/topic/' + topic.id);
      }}
      marginBottom={2}
    >
      <Stack spacing={1} p="10px" width="100%">
        <Stack direction="column" spacing={0.6} align="left" fontSize="9pt">
          {/*Home Page Check */}
          <Text>
            Posted by
            <b> "Admin" </b>
            {moment(new Date(topic.modifyDate)).fromNow()}
          </Text>
          {Status()}
        </Stack>
        <Text fontSize="12pt" fontWeight={600}>
          {topic.name}
        </Text>
        <Text fontSize="10pt" fontWeight={500}>
          {topic.description}
        </Text>
        <Flex justify="center" align="center" p={2} width="inherit">
          <Image borderRadius={10} src={topic.imageURL} maxHeight="200px" />
        </Flex>
      </Stack>
    </Flex>
  );
};
export default IdeaItem;
