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

type CategoryProps = {
  CategoryData: {
    id?: number;
    name: string;
  }[];
};
const Category: React.FC<CategoryProps> = ({ CategoryData }) => {
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayUpdateCatModal, setDisplayUpdateCatModal] = useState(false);
  const [valueCatModal, setValueCatModal] = useState<{
    id?: number;
    name: string;
  }>();
  const [category, setCategory] = useState<string>();
  const [listCategory, setListCategory] = useState<
    {
      id?: number;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    setListCategory(CategoryData);
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
      if (category) {
        axios
          .post('https://backend-2tza.onrender.com/cate/create', {
            name: category,
          })
          .then((response) => {
            console.log('after creating idea ===>', response);
            setListCategory([...listCategory, response.data]);
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
    setDisplayUpdateCatModal(true);
    setValueCatModal(item);
  };
  const hideUpdateCatModal = () => {
    setDisplayUpdateCatModal(false);
  };
  const handleUpdateCategory = async () => {
    setLoading(true);
    try {
      if (category) {
        {
          axios
            .put('https://backend-2tza.onrender.com/cate/update', {
              id: valueCatModal?.id,
              name: category,
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
    setCategory(value);
  };

  const showDeleteModal = (item: { id?: number; name: string }) => {
    setDisplayConfirmationModal(true);
    setValueCatModal(item);
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
          'https://backend-2tza.onrender.com/cate/delete/' + valueCatModal?.id
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
          Category List
        </Text>
      </Flex>
      <Flex direction="column">
        <TableContainer>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th fontSize={12}>Category Name</Th>
                <Th fontSize={12}>Function</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listCategory.map((item) => (
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
            onClick={() => showCatModal()}
          >
            Create new category
          </Button>
        </Flex>
      </Flex>
      <CreateCategory
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
        showModal={displayUpdateCatModal}
        Update={handleUpdateCategory}
        hideModal={hideUpdateCatModal}
        onChange={onTextChange}
        loading={loading}
        CategoryData={valueCatModal}
      />
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get topic data and pass it to cline
  //context.query.topicId as string => getting id from route
  try {
    const response = await axios.get('https://backend-2tza.onrender.com/cate');
    console.log(response.data);
    return {
      props: {
        CategoryData: JSON.parse(safeJsonStringify([...response.data])),
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default Category;
