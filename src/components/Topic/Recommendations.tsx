import { Topic, TopTopic } from "@/atoms/topicAtom";
import useTopics from "@/hooks/useTopics";
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
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";


type RecommendationsProps = {

};

const dummyData: TopTopic[] = [
    {
        id: 1,
        name: "test 1",
        numOfFollowers: 123,
        topic_closure_date: "2023-03-09",
        final_closure_date: "2023-03-10",
        imgURL: "https://firebasestorage.googleapis.com/v0/b/enterpriseprojectdemo.appspot.com/o/Ideas%2F0226f7d6-4538-04a3-5cb1-15a516eec596?alt=media&token=3ac89c2c-8d5a-4629-9f38-c700effc085d"
    },
    {
        id: 2,
        name: "test 2",
        numOfFollowers: 123,
        topic_closure_date: "2023-03-09",
        final_closure_date: "2023-03-10",
        imgURL: "https://firebasestorage.googleapis.com/v0/b/enterpriseprojectdemo.appspot.com/o/Ideas%2F0226f7d6-4538-04a3-5cb1-15a516eec596?alt=media&token=3ac89c2c-8d5a-4629-9f38-c700effc085d"
    },
    {
        id: 3,
        name: "test 3",
        numOfFollowers: 123,
        topic_closure_date: "2023-03-09",
        final_closure_date: "2023-03-10",
        imgURL: "https://firebasestorage.googleapis.com/v0/b/enterpriseprojectdemo.appspot.com/o/Ideas%2F0226f7d6-4538-04a3-5cb1-15a516eec596?alt=media&token=3ac89c2c-8d5a-4629-9f38-c700effc085d"
    }
]


const Recommendations: React.FC<RecommendationsProps> = () => {
    const [topics, setTopics] = useState<TopTopic[]>(dummyData);
    const [loading, setLoading] = useState(false);
    const { topicStateValue, onFollowOrUnfollowTopic } = useTopics();

    const getCommunityRecommendations = async () => {
        setLoading(true);

        setLoading(false);
    };

    useEffect(() => {
        //getCommunityRecommendations();
    }, []);

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
                                (snippet) => snippet.topic_id === item.id
                            );
                            return (
                                <Link key={item.id} href={`/topic/${item.id}`}>
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
                                            <Flex width="15%">
                                                <Text mr={2}>{index + 1}</Text>
                                            </Flex>
                                            <Flex align="center" width="80%">
                                                {item.imgURL ? (
                                                    <Image
                                                        borderRadius="full"
                                                        boxSize="28px"
                                                        src={item.imgURL}
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
                                                <span
                                                    style={{
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >{item.name}</span>
                                            </Flex>
                                        </Flex>
                                        <Box position="absolute" right="10px">
                                            <Button
                                                height="22px"
                                                fontSize="8pt"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    onFollowOrUnfollowTopic(item.id, isJoined);
                                                }}
                                                variant={isJoined ? "secondary" : "primary"}
                                            >
                                                {isJoined ? "Followed" : "Follow"}
                                            </Button>
                                        </Box>
                                    </Flex>
                                </Link>
                            );
                        })}
                        <Box p="10px 20px">
                            <Button height="30px" width="100%">
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