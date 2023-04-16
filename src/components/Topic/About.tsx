import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    Skeleton,
    SkeletonCircle,
    Stack,
    Text,
    Image,
    Spinner,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaReddit } from "react-icons/fa";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { Topic } from "@/atoms/topicAtom";
import { auth } from "@/Firebase/clientApp";

type AboutProps = {
    topicData: Topic;
    pt?: number;
    onCreatePage?: boolean;
    loading?: boolean;
};

const About: React.FC<AboutProps> = ({
    topicData,
    pt,
    onCreatePage,
    loading,
}) => {
    const [user] = useAuthState(auth); // will revisit how 'auth' state is passed
    const router = useRouter();

    return (
        <Box pt={pt} position="sticky" top="14px">
            <Flex
                justify="space-between"
                align="center"
                p={3}
                color="white"
                bgGradient='linear(to-r, brand.900, brand.800)'
                borderRadius="4px 4px 0px 0px"
            >
                <Text fontSize="10pt" fontWeight={700}>
                    About Topic
                </Text>
                <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
            </Flex>
            <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
                {loading ? (
                    <Stack mt={2}>
                        <SkeletonCircle size="10" />
                        <Skeleton height="10px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                    </Stack>
                ) : (
                    <>
                        <Stack spacing={2}>
                            <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
                                <Flex direction="column" flexGrow={1}>
                                    <Text>
                                        {topicData.ideas?.length}
                                    </Text>
                                    <Text> Ideas</Text>
                                </Flex>
                                <Flex direction="column" flexGrow={1}>
                                    <Text>{topicData.id}</Text>
                                    <Text>Followers</Text>
                                </Flex>
                            </Flex>
                            <Divider />
                            <Flex
                                align="center"
                                width="100%"
                                p={1}
                                fontWeight={500}
                                fontSize="10pt"
                            >
                                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                                {topicData?.modifyDate && (
                                    <Text>
                                        Created at: {" "}
                                        {moment(
                                            new Date(topicData.modifyDate)
                                        ).format("MMM DD, YYYY")}
                                    </Text>
                                )}
                            </Flex>
                            <Flex
                                align="center"
                                width="100%"
                                p={1}
                                fontWeight={500}
                                fontSize="10pt"
                            >
                                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                                <Text>
                                    Idea Closure at:{" "}
                                    {topicData.topic_closure_date}
                                    {/* {moment(
                                            new Date(topicData.modifyDate)
                                        ).format("MMM DD, YYYY")} */}
                                </Text>
                            </Flex>
                            <Flex
                                align="center"
                                width="100%"
                                p={1}
                                fontWeight={500}
                                fontSize="10pt"
                            >
                                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                                <Text>
                                    Comment Closure at:{" "}
                                    {topicData.final_closure_date}
                                    {/* {moment(
                                            new Date(topicData.modifyDate)
                                        ).format("MMM DD, YYYY")} */}
                                </Text>
                            </Flex>
                            <Flex
                                align="center"
                                width="100%"
                                p={1}
                                fontWeight={500}
                                fontSize="10pt"
                            >
                                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                                <Text>
                                    Status{" "}
                                    {new Date(topicData.topic_closure_date).getTime() < new Date().getTime() ?
                                        "Closed for new ideas" : "Open"}
                                    {/* {moment(
                                            new Date(topicData.modifyDate)
                                        ).format("MMM DD, YYYY")} */}
                                </Text>
                            </Flex>
                            {/* !!!ADDED AT THE VERY END!!! INITIALLY DOES NOT EXIST */}
                            {/* {user?.uid === topicData?.creatorId && (
                <>
                  <Divider />
                  <Stack fontSize="10pt" spacing={1}>
                    <Text fontWeight={600}>Admin</Text>
                    <Flex align="center" justify="space-between">
                      <Text
                        color="blue.500"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => selectFileRef.current?.click()}
                      >
                        Change Image
                      </Text>
                      {topicData?.imageURL || selectedFile ? (
                        <Image
                          borderRadius="full"
                          boxSize="40px"
                          src={selectedFile || topicData?.imageURL}
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Icon
                          as={FaReddit}
                          fontSize={40}
                          color="brand.100"
                          mr={2}
                        />
                      )}
                    </Flex>
                    {selectedFile &&
                      (imageLoading ? (
                        <Spinner />
                      ) : (
                        <Text cursor="pointer" onClick={updateImage}>
                          Save Changes
                        </Text>
                      ))}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      hidden
                      ref={selectFileRef}
                      onChange={onSelectImage}
                    />
                  </Stack>
                </>
              )} */}
                        </Stack>
                    </>
                )}
            </Flex>
        </Box>
    );
};
export default About;