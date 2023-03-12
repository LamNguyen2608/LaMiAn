import { Topic } from '@/atoms/topicAtom';
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import router from 'next/router';
import React, { useRef, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';

type detailsProps = {
  TopicData: Topic;
};
const TopicDetails: React.FC<detailsProps> = ({ TopicData }) => {
  return (
    <Flex justify="center" p="10px 50px" direction="column">
      <Box p="14px 0px" borderBottom="2px solid" borderColor="blackAlpha.600">
        <Text fontSize={25} fontWeight={900}>
          Topic Details
        </Text>
      </Box>
      <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600">
        Topic content
      </Text>
      <Text fontSize="14pt">{TopicData.name}</Text>
      <Text fontSize="14pt">{TopicData.description}</Text>
      <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600">
        Uploaded image
      </Text>
      <Flex
        direction="column"
        mt={3}
        justify="center"
        align="center"
        width="100%"
      >
        <Image src={TopicData.imageURL} maxWidth="60%" maxHeight="60%" />
      </Flex>
      <Flex mt={2} width="100%" justify="center" direction="row">
        <Flex width="50%" direction="column">
          <Text
            mb={2}
            mt={2}
            fontSize={20}
            fontWeight={900}
            color="blackAlpha.600"
          >
            Closure Date
          </Text>
          <Text fontSize="14pt">{TopicData.topic_closure_date}</Text>
        </Flex>
        <Flex width="50%" direction="column" ml={2}>
          <Text
            mb={2}
            mt={2}
            fontSize={20}
            fontWeight={900}
            color="blackAlpha.600"
          >
            Final Closure Date
          </Text>
          <Text fontSize="14pt">{TopicData.final_closure_date}</Text>
        </Flex>
      </Flex>
      <Flex justify="center" align="center">
        <Button
          height="50px"
          width="30%"
          variant="primary"
          type="submit"
          mt={8}
          mb={8}
          onClick={() => router.back()}
        >
          Back to topic list
        </Button>
      </Flex>
    </Flex>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get topic data and pass it to cline
  //context.query.topicId as string => getting id from route
  try {
    const response = await axios.get(
      ('http://localhost:8080/topic/' + context.query.topicId) as string
    );
    console.log(response.data);
    return {
      props: {
        TopicData: JSON.parse(safeJsonStringify({ ...response.data })),
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default TopicDetails;
