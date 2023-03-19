import { Topic } from '@/atoms/topicAtom';
import { storage } from '@/Firebase/clientApp';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { GetServerSidePropsContext } from 'next';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import safeJsonStringify from 'safe-json-stringify';

type detailsProps = {
  TopicData: Topic;
};
const TopicEdit: React.FC<detailsProps> = ({ TopicData }) => {
  const [topicForm, setTopicForm] = useState<Topic>();
  const [selectedFile, setSelectedFile] = useState<string>('');
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(false);
  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const compareDate = new Date(topicForm.topic_closure_date).getTime() <= new Date(topicForm.final_closure_date).getTime();
    const {
      target: { name, value },
    } = event;
    setTopicForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log('data:', topicForm);
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result as string);
    };
  };
  useEffect(() => {
    if (TopicData) {
      setTopicForm(TopicData);
      setSelectedFile(TopicData.imageURL ? TopicData.imageURL : '');
    }
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //set Error
    if (topicForm?.topic_closure_date > topicForm?.final_closure_date) {
      return;
    }
    console.log(topicForm);
    setLoading(true);
    const updateTopic: Topic = {
      id: TopicData.id,
      name: topicForm?.name,
      description: topicForm?.description,
      imageURL: topicForm?.imageURL,
      topic_closure_date: topicForm?.topic_closure_date,
      final_closure_date: topicForm?.final_closure_date,
    };

    try {
      //image URL

      if (selectedFile != TopicData.imageURL) {
        const imageRef = ref(storage, `Topics/` + uuid());
        uploadString(imageRef, selectedFile, 'data_url').then((result) => {
          console.log('result of uploading image ====>', result);
          getDownloadURL(imageRef).then((url) => {
            updateTopic.imageURL = url as string;
            console.log('updateTopic===>', updateTopic);
            axios
              .put('http://localhost:8080/topic/update', updateTopic)
              .then((response) => {
                console.log('after creating idea ===>', response);
                setLoading(false);
                router.back();
              });
          });
        });
      } else {
        console.log('newPost===>', updateTopic);
        axios
          .put('http://localhost:8080/topic/update', updateTopic)
          .then((response) => {
            console.log('after creating idea ===>', response);
            setLoading(false);
            router.back();
          });
      }
    } catch (error: any) {
      console.log('handleCreatePost error check', error.message);
      setLoading(false);
    }
  };
  const isInvalid =
    topicForm?.topic_closure_date > topicForm?.final_closure_date;
  return (
    <form onSubmit={onSubmit}>
      <Flex justify="center" p="10px 50px" direction="column">
        <button type="button" onClick={() => router.back()}>
          Click here to go back
        </button>
        <Box p="14px 8px" borderBottom="2px solid" borderColor="blackAlpha.600">
          <Text fontSize={25} fontWeight={900}>
            Update topic
          </Text>
        </Box>
        <Text
          mb={2}
          mt={2}
          fontSize={20}
          fontWeight={900}
          color="blackAlpha.600"
        >
          Topic content
        </Text>
        <Input
          required
          name="name"
          onChange={onTextChange}
          defaultValue={TopicData.name}
          fontSize="14pt"
          placeholder="Title"
          borderRadius={4}
          bg="gray.50"
          _placeholder={{ color: 'gray.500' }}
          focusBorderColor="black"
          _hover={{
            bg: 'white',
            border: '2px solid',
            borderColor: 'brand.600',
          }}
          _focus={{
            outline: 'none',
            bg: 'white',
            border: '1px solid',
            borderColor: 'black',
          }}
        />
        <Textarea
          name="description"
          fontSize="14pt"
          onChange={onTextChange}
          defaultValue={TopicData.description}
          placeholder="Topic description..."
          bg="gray.50"
          borderRadius={4}
          mt={2}
          height="100px"
          _placeholder={{ color: 'gray.500' }}
          focusBorderColor="black"
          _hover={{
            bg: 'white',
            border: '2px solid',
            borderColor: 'brand.600',
          }}
          _focus={{
            outline: 'none',
            bg: 'white',
            border: '1px solid',
            borderColor: 'black',
          }}
        />
        <Text
          mb={2}
          mt={2}
          fontSize={20}
          fontWeight={900}
          color="blackAlpha.600"
        >
          Upload image
        </Text>
        <Flex
          direction="column"
          mt={3}
          justify="center"
          align="center"
          width="100%"
        >
          {selectedFile ? (
            <>
              <Image src={selectedFile} maxWidth="50%" maxHeight="50%" />
              <Flex direction="row" align="center">
                <Button
                  mt={4}
                  height="36px"
                  width="120px"
                  variant="primary"
                  type="submit"
                  onClick={() => setSelectedFile('')}
                >
                  Remove Image
                </Button>
              </Flex>
            </>
          ) : (
            <>
              <Stack spacing={3} width="100%">
                <Flex
                  justify="center"
                  align="center"
                  p={20}
                  border="2px dashed"
                  borderColor="brand.600"
                  borderRadius={4}
                  width="100%"
                >
                  <Button
                    height="34px"
                    width="80px"
                    variant="primary"
                    type="submit"
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Upload
                  </Button>
                  <Input
                    ref={selectedFileRef}
                    type="file"
                    hidden
                    onChange={onSelectImage}
                  />
                  <img src={selectedFile} />
                </Flex>
                <Flex justify="flex-end"></Flex>
              </Stack>
            </>
          )}
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
            <Input
              placeholder="Select Date and Time"
              name="topic_closure_date"
              size="md"
              type="datetime-local"
              fontSize="14pt"
              defaultValue={TopicData.topic_closure_date}
              onChange={onTextChange}
              isInvalid={isInvalid}
              bg="gray.50"
              borderRadius={4}
              height="50px"
              _placeholder={{ color: 'gray.500' }}
              focusBorderColor="black"
              _hover={{
                bg: 'white',
                border: '2px solid',
                borderColor: 'brand.600',
              }}
              _focus={{
                outline: 'none',
                bg: 'white',
                border: '1px solid',
                borderColor: 'black',
              }}
            />
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
            <Input
              placeholder="Select Date and Time"
              name="final_closure_date"
              size="md"
              defaultValue={TopicData.final_closure_date}
              isInvalid={isInvalid}
              type="datetime-local"
              fontSize="14pt"
              onChange={onTextChange}
              bg="gray.50"
              borderRadius={4}
              height="50px"
              _placeholder={{ color: 'gray.500' }}
              focusBorderColor="black"
              _hover={{
                bg: 'white',
                border: '2px solid',
                borderColor: 'brand.600',
              }}
              _focus={{
                outline: 'none',
                bg: 'white',
                border: '1px solid',
                borderColor: 'black',
              }}
            />
          </Flex>
        </Flex>
        {isInvalid && (
          <Text
            textAlign="center"
            fontWeight={900}
            color="red"
            fontSize="10pt"
            mt={2}
          >
            Invalid Date
          </Text>
        )}
        <Flex justify="center">
          <Button
            height="50px"
            width="50%"
            mt={8}
            mb={8}
            loadingText="Posting"
            variant="primary"
            type="submit"
            isLoading={loading}
            spinnerPlacement="start"
            _loading={{ opacity: 2 }}
          >
            Update{''}
          </Button>
        </Flex>
      </Flex>
    </form>
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
export default TopicEdit;
