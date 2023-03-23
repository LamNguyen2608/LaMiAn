import { Topic } from '@/atoms/topicAtom';
import { storage } from '@/Firebase/clientApp';
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import moment from 'moment';
import router from 'next/router';
import React, { useRef, useState } from 'react';
import uuid from 'react-uuid';

const CreateTopicForm: React.FC = () => {
  const [topicForm, setTopicForm] = useState({
    title: '',
    description: '',
    idea_closure_date: '',
    final_closure_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //set Error
    if (topicForm?.idea_closure_date > topicForm?.final_closure_date) {
      return;
    }
    setLoading(true);
    //create new post object => type post
    const newTopic: Topic = {
      name: topicForm.title,
      description: topicForm.description,
      imageURL: null,
      topic_closure_date: topicForm.idea_closure_date,
      final_closure_date: topicForm.final_closure_date,
    };
    //image URL
    try {
      if (selectedFile) {
        const imageRef = ref(storage, `Topics/` + uuid());
        uploadString(imageRef, selectedFile, 'data_url').then((result) => {
          console.log('result of uploading image ====>', result);
          getDownloadURL(imageRef).then((url) => {
            newTopic.imageURL = url as string;
            console.log('newPost===>', newTopic);
            axios
              .post('https://backend-2tza.onrender.com/topic/create', newTopic)
              .then((response) => {
                console.log('after creating topic ===>', response);
                setLoading(false);
                router.push('/Admin/Topic/TopicList');
              });
          });
        });
      } else {
        console.log('newTopic===>', newTopic);
        axios
          .post('https://backend-2tza.onrender.com/topic/create', newTopic)
          .then((response) => {
            console.log('after creating topic ===>', response);
            setLoading(false);
            router.push('/Admin/Topic/TopicList');
          });
      }
    } catch (error: any) {
      console.log('handleCreateTopic error check', error.message);
      setLoading(false);
    }
  };
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newDate = moment(new Date(topicForm.idea_closure_date)).format(
      'YYYY-MM-DD'
    );
    //update form state
    setTopicForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      newDate,
    }));
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
  const isInvalid =
    topicForm?.idea_closure_date > topicForm?.final_closure_date;
  return (
    <form onSubmit={onSubmit}>
      <Flex justify="center" p="10px 50px" direction="column">
        <Box p="14px 8px" borderBottom="2px solid" borderColor="blackAlpha.600">
          <Text fontSize={25} fontWeight={900}>
            Create new topic
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
          name="title"
          onChange={onChange}
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
          onChange={onChange}
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
              <Image src={selectedFile} maxWidth="60%" maxHeight="60%" />

              <Button
                mt={4}
                height="50px"
                width="20%"
                variant="primary"
                onClick={() => setSelectedFile('')}
              >
                Remove Image
              </Button>
            </>
          ) : (
            <Flex
              justify="center"
              align="center"
              p={20}
              border="2px dashed"
              borderColor="brand.600"
              borderRadius={4}
              width="60%"
              height="50px"
            >
              <Button
                height="34px"
                width="80px"
                variant="primary"
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
              name="idea_closure_date"
              size="md"
              type="datetime-local"
              isInvalid={isInvalid}
              fontSize="14pt"
              onChange={onChange}
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
              type="datetime-local"
              fontSize="14pt"
              isInvalid={isInvalid}
              onChange={onChange}
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
            variant="primary"
            type="submit"
            mt={8}
            mb={8}
            isDisabled={!topicForm.title}
            loadingText="Creating"
            spinnerPlacement="start"
            isLoading={loading}
            _loading={{ opacity: 2 }}
          >
            Post
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
export default CreateTopicForm;
