import React, { use, useEffect, useState } from 'react';
import {
  Box,
  Button,
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
import { AiFillDelete, AiFillEdit, AiFillInfoCircle } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import CreateCategory from '@/pages/Admin/Category/CreateCategory';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import UpdateCategory from '@/pages/Admin/Category/UpdateCategory';
import CreateDepartment from './CreateDepartment';

type departmentProps = {
  departmentData: {
    id?: number;
    name: string;
  }[];
};
const Category: React.FC<departmentProps> = ({ departmentData }) => {
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayUpdateDepModal, setDisplayUpdateDepModal] = useState(false);
  const [valueDepModal, setValueDepModal] = useState<{
    id?: number;
    name: string;
  }>();
  const [department, setDepartment] = useState<string>();
  const [listDepartment, setListDepartment] = useState<
    {
      id?: number;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    setListDepartment(departmentData);
  }, []);
  const [loading, setLoading] = useState(false);
  const [displayCatModal, setDisplayCatModal] = useState(false);
  const showCatModal = () => {
    setDisplayCatModal(true);
  };
  const hideCatModal = () => {
    setDisplayCatModal(false);
  };
  const handleCreateCategory = async () => {
    setLoading(true);
    try {
      if (department) {
        axios
          .post('http://localhost:8080/department/create', {
            name: department,
          })
          .then((response) => {
            console.log('after creating idea ===>', response);
            setListDepartment([...listDepartment, response.data]);
            setLoading(false);
            hideCatModal();
          });
      } else {
        setLoading(false);
        hideCatModal();
      }
    } catch (error: any) {
      console.log('handleCreatePost error check', error.message);
      setLoading(false);
    }
  };
  const showUpdateCatModal = (item: { id?: number; name: string }) => {
    setDisplayUpdateDepModal(true);
    setValueDepModal(item);
  };
  const hideUpdateCatModal = () => {
    setDisplayUpdateDepModal(false);
  };
  const handleUpdateCategory = async () => {
    setLoading(true);
    try {
      if (department) {
        {
          axios
            .put('http://localhost:8080/department/update', {
              id: valueDepModal?.id,
              name: department,
            })
            .then((response) => {
              console.log('after updateTopic ===>', response);
              window.location.reload();
              setLoading(false);
              hideUpdateCatModal();
            });
        }
      } else {
        setLoading(false);
        hideUpdateCatModal();
      }
    } catch (error: any) {
      console.log('handleUpdatePost error check', error.message);
      setLoading(false);
    }
  };
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDepartment(value);
  };

  const showDeleteModal = (item: { id?: number; name: string }) => {
    setDisplayConfirmationModal(true);
    setValueDepModal(item);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const submitDelete = async () => {
    setLoading(true);
    try {
      axios
        .delete('http://localhost:8080/department/delete/' + valueDepModal?.id)
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

  return (
    <>
      <Box p="24px 10px" borderBottom="2px solid" borderColor="white">
        <Icon
          as={IoMdArrowRoundBack}
          fontSize={30}
          onClick={() => router.back()}
        />
        <Text fontSize={22} fontWeight={900}>
          Department List
        </Text>
      </Box>
      <Flex direction="column">
        <TableContainer>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th fontSize={12}>Derpartment Name</Th>
                <Th fontSize={12}>Function</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listDepartment.map((item) => (
                <Tr>
                  <Td fontSize={14} fontWeight={900}>
                    {item.name}
                  </Td>
                  <Td justifyItems="center">
                    <Icon
                      as={AiFillEdit}
                      fontSize={35}
                      color="brand.900"
                      _hover={{ color: 'blue.300' }}
                      ml="20px"
                      onClick={() => showUpdateCatModal(item)}
                    />

                    <Icon
                      as={AiFillDelete}
                      fontSize={35}
                      color="brand.900"
                      _hover={{ color: 'red' }}
                      ml="20px"
                      onClick={() => showDeleteModal(item)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justify="flex-end" mr={10} mt={5}>
          <Button
            height="44px"
            width="160px"
            variant="primary"
            type="submit"
            onClick={() => showCatModal()}
          >
            Create new category
          </Button>
        </Flex>
      </Flex>
      <CreateDepartment
        showModal={displayCatModal}
        Create={handleCreateCategory}
        hideModal={hideCatModal}
        onChange={onTextChange}
        loading={loading}
      />
      <DeleteConfirmationModal
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        loading={loading}
      />
      <UpdateCategory
        showModal={displayUpdateDepModal}
        Update={handleUpdateCategory}
        hideModal={hideUpdateCatModal}
        onChange={onTextChange}
        loading={loading}
        CategoryData={valueDepModal}
      />
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get topic data and pass it to cline
  //context.query.topicId as string => getting id from route
  try {
    const response = await axios.get('http://localhost:8080/department');
    console.log(response.data);
    return {
      props: {
        departmentData: JSON.parse(safeJsonStringify([...response.data])),
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default Category;
