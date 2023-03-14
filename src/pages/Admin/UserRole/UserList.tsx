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
import router from 'next/router';
import { AiFillDelete, AiFillEdit, AiFillInfoCircle } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import safeJsonStringify from 'safe-json-stringify';
import { Topic } from '@/atoms/topicAtom';
import UpdateRole from '@/pages/Admin/UserRole/UpdateRole';
import { Idea } from '@/atoms/ideaAtom';

type roleProps = {
  UserData: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    client_info: string;
    age: number;
    pronoun: string;
    department_id: number;
    role: string;
  }[];
};
const UserList: React.FC<roleProps> = ({ UserData }) => {
  const [userList, setUserList] = useState<
    {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
      age: number;
      pronoun: string;
      department_id: number;
      client_info: string;
      role: string;
    }[]
  >([]);
  useEffect(() => {
    setUserList(UserData);
  }, []);
  const [userRole, setUserRole] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [displayUpdateModal, setDisplayUpdateModal] = useState(false);
  const hideUpdateModal = () => {
    setDisplayUpdateModal(false);
  };
  const [valueRoleModal, setValueRoleModal] = useState<{
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
    client_info: string;
    role: string;
  }>();
  const showUpdateRole = (item: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
    client_info: string;
    role: string;
  }) => {
    setDisplayUpdateModal(true);
    setValueRoleModal(item);
  };
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setUserRole(value);
  };

  const handleUpdateRole = async () => {
    setLoading(true);
    try {
      if (userRole) {
        {
          axios
            .put('http://localhost:8080/client/update', {
              id: valueRoleModal?.id,
              email: valueRoleModal?.email,
              firstname: valueRoleModal?.firstname,
              lastname: valueRoleModal?.lastname,
              age: valueRoleModal?.age,
              client_info: valueRoleModal?.client_info,
              role: userRole,
            })
            .then((response) => {
              console.log('after updateTopic ===>', response);
              window.location.reload();
              setLoading(false);
              hideUpdateModal();
            });
        }
      } else {
        setLoading(false);
        hideUpdateModal();
      }
    } catch (error: any) {
      console.log('handleUpdatePost error check', error.message);
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
          User List
        </Text>
      </Flex>
      <Flex direction="column">
        <TableContainer>
          <Table variant="striped" colorScheme="pink">
            <Thead>
              <Tr>
                <Th fontSize={16}>User First Name</Th>
                <Th fontSize={16}>User Last Name</Th>
                <Th fontSize={16}>User Email</Th>
                <Th fontSize={16}>User Age</Th>
                <Th fontSize={16}>User pronoun</Th>
                <Th fontSize={16}>Role</Th>
                <Th fontSize={16}>Edit Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userList.map((item) => (
                <Tr>
                  <Td fontWeight={900}>{item.firstname}</Td>
                  <Td>{item.lastname}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.age}</Td>
                  <Td>{item.pronoun}</Td>
                  <Td>{item.role}</Td>
                  <Td justifyItems="center">
                    <Icon
                      as={AiFillEdit}
                      fontSize={40}
                      color="gray.400"
                      _hover={{ color: 'blue.300' }}
                      ml="20px"
                      onClick={() => showUpdateRole(item)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <UpdateRole
        showModal={displayUpdateModal}
        hideModal={hideUpdateModal}
        onChange={onSelectChange}
        loading={loading}
        Update={handleUpdateRole}
        userData={valueRoleModal}
      />
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get topic data and pass it to cline
  //context.query.topicId as string => getting id from route
  try {
    const response = await axios.get('http://localhost:8080/client');
    console.log(response.data);
    return {
      props: {
        UserData: JSON.parse(safeJsonStringify([...response.data])),
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default UserList;
