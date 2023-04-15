import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Link,
  LinkOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmation';
import router from 'next/router';
import { AiFillDelete, AiFillEdit, AiFillInfoCircle, AiOutlineDownload } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import safeJsonStringify from 'safe-json-stringify';
import { Topic } from '@/atoms/topicAtom';
import useClient from '@/hooks/useClient';

type topicProps = {
  TopicData: Topic[];
};
const TopicList: React.FC<topicProps> = ({ TopicData }) => {
  const { clientStateValue, resetUserInfo } = useClient();
  //const [author, setAuthor] = useState(true);
  const [topicList, setTopicList] = useState<Topic[]>([]);
  useEffect(() => {
    setTopicList(TopicData);
  }, []);
  const [loading, setLoading] = useState(false);
  const [valueTopicModal, setValueTopicModal] = useState<Topic>();
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const showDeleteModal = (item: Topic) => {
    setDisplayConfirmationModal(true);
    setValueTopicModal(item);
  };
  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const submitDelete = async () => {
    setLoading(true);
    try {
      axios
        .delete('http://localhost:8080/topic/delete/' + valueTopicModal?.id)
        .then((response) => {
          console.log('after deleteTopic ===>', response);
          window.location.reload();
          setLoading(false);
          hideConfirmationModal();
        });
    } catch (error: any) {
      console.log('handleDeletePost error check', error.message);
      setLoading(false);
    }
  };
  console.log("current client admin ==>", clientStateValue.currentClient);
  if (clientStateValue.currentClient?.role == 'ROLE_ADMIN')
    return (
      <>
        <Flex
          direction="row"
          p="24px 10px"
          borderBottom="2px solid"
          borderColor="white"
        >
          <Icon
            as={IoMdArrowRoundBack}
            fontSize={30}
            cursor="pointer"
            onClick={() => router.push('/Admin')}
          />
          <Text fontSize={22} fontWeight={900}>
            Topic List
          </Text>
        </Flex>
        <Flex direction="column">
          <TableContainer>
            <Table variant="striped" colorScheme="pink">
              <Thead>
                <Tr>
                  <Th fontSize={16}>Topic Name</Th>
                  <Th fontSize={16}>Modify Date</Th>
                  <Th fontSize={16}> CLosure Date</Th>
                  <Th fontSize={16}>Final Closure Date</Th>
                  <Th fontSize={16}>Status</Th>
                  <Th fontSize={16}>function</Th>
                </Tr>
              </Thead>
              <Tbody>
                {topicList.map((item) => (
                  <Tr>
                    <Td fontWeight={900}>{item.name}</Td>
                    <Td>{item.modifyDate}</Td>
                    <Td>{item.topic_closure_date?.split('T').join(' ')}</Td>
                    <Td>{item.final_closure_date?.split('T').join(' ')}</Td>
                    <Td>Open</Td>
                    <Td justifyItems="center">
                      <Icon
                        as={AiFillInfoCircle}
                        fontSize={40}
                        color="gray.400"
                        _hover={{ color: 'yellow' }}
                        onClick={(e) =>
                          router.push('/Admin/Topic/' + item.id + '/TopicDetails')
                        }
                      />

                      <Icon
                        as={AiFillEdit}
                        fontSize={40}
                        color="gray.400"
                        _hover={{ color: 'blue.300' }}
                        ml="20px"
                        onClick={(e) =>
                          router.push('/Admin/Topic/' + item.id + '/TopicEdit')
                        }
                      />

                      <Icon
                        as={AiFillDelete}
                        fontSize={40}
                        color="gray.400"
                        _hover={{ color: 'red' }}
                        ml="20px"
                        onClick={() => showDeleteModal(item)}
                      />
                      <a href={'http://localhost:8080/topic/export/' + item.id}>
                        <Icon
                          as={AiOutlineDownload}
                          fontSize={40}
                          color="gray.400"
                          _hover={{ color: 'red' }}
                          ml="20px"

                        />
                      </a>

                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <DeleteConfirmationModal
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          loading={loading}
        />
      </>
    );
  else
    return (
      <div>
        <h1>401 Unauthorized</h1>
        <p>You are not authorized to access this page.</p>
      </div>
    )
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get topic data and pass it to cline
  //context.query.topicId as string => getting id from route
  try {
    const response = await axios.get('http://localhost:8080/topic');
    console.log(response.data);
    return {
      props: {
        TopicData: JSON.parse(safeJsonStringify([...response.data])),
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default TopicList;
