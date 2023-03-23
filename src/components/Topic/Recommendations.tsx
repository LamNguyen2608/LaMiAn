import { authModalState } from '@/atoms/authModalAtom';
import { Topic, TopTopic } from '@/atoms/topicAtom';
import { auth } from '@/Firebase/clientApp';
import useTopics from '@/hooks/useTopics';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { useRecoilState, useSetRecoilState } from 'recoil';

type RecommendationsProps = {};

const Recommendations: React.FC<RecommendationsProps> = () => {
  const [topics, setTopics] = useState<TopTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const { topicStateValue, onFollowOrUnfollowTopic } = useTopics();
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);
  const handleUser = () => {
    if (!user) {
      setAuthModalState({ open: true, view: 'login' });
    }
  };
  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      console.log('GET TOP FOLLOWERS TOPICS');
      axios
        .get('https://backend-2tza.onrender.com/topic/top7followers')
        .then((res) => {
          setTopics(res.data);
        });
    } catch (error) {
      console.log('FAILED TO GET TOP FOLLOWERS TOPICS ==>', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  const allTopic = () => {
    router.push('/Search/searchResult');
  };
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/recCommsArt.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, brand.100, brand.200 )"
      >
        Most followed Topics
      </Flex>
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {topics.map((item, index) => {
              const isJoined = !!topicStateValue.followedTopics.find(
                (snippet) => snippet.topic_id === item.topic_id
              );
              return (
                <div key={item.topic_id}>
                  <Flex
                    position="relative"
                    align="center"
                    fontSize="10pt"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    p="10px 12px"
                    fontWeight={600}
                  >
                    <Flex width="80%" align="center">
                      <Flex width="10%">
                        <Text>{index + 1}</Text>
                      </Flex>
                      <Flex align="center" width="80%">
                        <li key={item.topic_id}>
                          {item.image_url ? (
                            <Image
                              borderRadius="full"
                              boxSize="28px"
                              src={item.image_url}
                              mr={2}
                            />
                          ) : (
                            <Icon
                              as={FaReddit}
                              fontSize={30}
                              color="brand.900"
                              mr={2}
                            />
                          )}
                          <Link
                            key={item.topic_id}
                            href={`/topic/${item.topic_id}`}
                          >
                            <span
                              style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {item.topic_name}
                            </span>
                          </Link>
                        </li>
                      </Flex>
                    </Flex>
                    <Box position="relative" right="5px" marginLeft={2}>
                      <li key={item.topic_id}>
                        <Button
                          height="22px"
                          fontSize="8pt"
                          onClick={(event) => {
                            event.stopPropagation();
                            onFollowOrUnfollowTopic(item.topic_id, isJoined);
                            handleUser();
                          }}
                          variant={isJoined ? 'secondary' : 'primary'}
                        >
                          {isJoined ? 'Followed' : 'Follow'}
                        </Button>
                      </li>
                    </Box>
                  </Flex>
                </div>
              );
            })}
            <Box p="10px 20px">
              <Button height="30px" width="100%" onClick={() => allTopic()}>
                View All
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default Recommendations;
