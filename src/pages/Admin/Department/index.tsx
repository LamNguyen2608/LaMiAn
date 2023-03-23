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
import UpdateDepartment from './UpdateDepartment';

type departmentProps = {
  departmentData: {
    name: string;
    department_info: string;
  }[];
};
const Category: React.FC<departmentProps> = ({ departmentData }) => {
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayUpdateDepModal, setDisplayUpdateDepModal] = useState(false);
  const [valueDepModal, setValueDepModal] = useState<{
    id?: number;
    name: string;
    department_info: string;
  }>();
  const [department, setDepartment] = useState<{
    id?: number;
    name: string;
    department_info: string;
  }>();
  const [listDepartment, setListDepartment] = useState<
    {
      id?: number;
      name: string;
      department_info: string;
    }[]
  >([]);
  useEffect(() => {
    setListDepartment(departmentData);
  }, []);
  const [loading, setLoading] = useState(false);
  const [displayCatModal, setDisplayCatModal] = useState(false);
  const showCreateModal = () => {
    setDisplayCatModal(true);
  };
  const hideCatModal = () => {
    setDisplayCatModal(false);
  };
  const handleCreateDepartment = async () => {
    setLoading(true);
    try {
      if (department) {
        axios
          .post('https://backend-2tza.onrender.com/department/create', {
            name: department.name,
            department_info: department.department_info,
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
  const showUpdateCatModal = (item: {
    id?: number;
    name: string;
    department_info: string;
  }) => {
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
            .put('https://backend-2tza.onrender.com/department/update', {
              id: valueDepModal?.id,
              name: department.name,
              department_info: department.department_info,
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
  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //update form state
    setDepartment((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const showDeleteModal = (item: {
    id?: number;
    name: string;
    department_info: string;
  }) => {
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
        .delete(
          'https://backend-2tza.onrender.com/department/delete/' +
            valueDepModal?.id
        )
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
          Department List
        </Text>
      </Flex>
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
                <li key={item.id}>
                  <Tr>
                    <Td fontSize={14} fontWeight={900}>
                      <li key={item.id}>{item.name}</li>
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
                </li>
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
            onClick={() => showCreateModal()}
          >
            Create new category
          </Button>
        </Flex>
      </Flex>
      <CreateDepartment
        showModal={displayCatModal}
        Create={handleCreateDepartment}
        hideModal={hideCatModal}
        onChange={onTextChange}
        loading={loading}
        department={department}
      />
      <DeleteConfirmationModal
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        loading={loading}
      />
      <UpdateDepartment
        showModal={displayUpdateDepModal}
        Update={handleUpdateCategory}
        hideModal={hideUpdateCatModal}
        onChange={onTextChange}
        loading={loading}
        depData={valueDepModal}
      />
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get topic data and pass it to cline
  //context.query.topicId as string => getting id from route
  try {
    const response = await axios.get(
      'https://backend-2tza.onrender.com/department'
    );
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
