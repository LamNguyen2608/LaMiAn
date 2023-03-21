import React, { useRef, useState } from 'react';
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
} from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FaBirthdayCake, FaReddit, FaUserAstronaut } from 'react-icons/fa';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { Topic } from '@/atoms/topicAtom';
import { auth } from '@/Firebase/clientApp';
import { Client } from '@/atoms/clientAtom';
import { MdEditNote, MdOutlineMail } from 'react-icons/md';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { TbTournament } from 'react-icons/tb';

type UserAboutProps = {
  userData: Client;
  pt?: number;
  onCreatePage?: boolean;
  loading?: boolean;
  showModal: () => void;
};

const About: React.FC<UserAboutProps> = ({
  userData,
  pt,
  onCreatePage,
  loading,
  showModal,
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
        bgGradient="linear(to-r, brand.900, brand.800)"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="15pt" fontWeight={700}>
          User About
        </Text>
        <Icon
          as={MdEditNote}
          cursor="pointer"
          fontSize={30}
          onClick={() => showModal()}
        />
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
                  <Text>{userData.ideas?.length}</Text>
                  <Text> Total of created ideas</Text>
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
                <Icon as={FaUserAstronaut} mr={2} fontSize={18} />
                {user?.displayName ? (
                  <Text>
                    User Name: {user?.displayName || user?.email?.split('@')[0]}
                  </Text>
                ) : (
                  <>
                    <Text>
                      User Name: {userData?.firstname} {userData?.lastname}
                    </Text>
                  </>
                )}
              </Flex>
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={MdOutlineMail} mr={2} fontSize={18} />
                {user?.email && <Text>User Email: {user.email}</Text>}
              </Flex>
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={FaBirthdayCake} mr={2} fontSize={18} />
                {userData.age ? (
                  <Text>User Age: {userData?.age}</Text>
                ) : (
                  <>
                    <Text>User Age: None</Text>
                  </>
                )}
              </Flex>
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={BsGenderAmbiguous} mr={2} fontSize={18} />
                {userData.pronoun ? (
                  <Text>User Pronoun: {userData?.pronoun}</Text>
                ) : (
                  <>
                    <Text>User Pronoun: None</Text>
                  </>
                )}
              </Flex>
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={TbTournament} mr={2} fontSize={18} />
                {userData?.department?.name ? (
                  <Text>User Department: {userData?.department?.name}</Text>
                ) : (
                  <>
                    <Text>User Department: None</Text>
                  </>
                )}
              </Flex>
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
};
export default About;