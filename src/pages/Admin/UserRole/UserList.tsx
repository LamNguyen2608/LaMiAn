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

type roleProps = {
  UserData: {
      id:"",
      email: "",
      firstname: "",
      lastname: "",
      age: "",
      pronoun: "",
      department: ""
      role: "",
  }[]
};
const UserList: React.FC<roleProps> = ({ UserData }) => {
  const [userList, setUserList] = useState<{
    id:"",
    email: "",
    firstname: "",
    lastname: "",
    age: "",
    pronoun: "",
    department: ""
    role:""}[]>([]);
  useEffect(() => {
    setUserList(UserData);
  }, []);
  const [loading, setLoading] = useState(false);
  const [displayUpdateModal, setDisplayUpdateModal] = useState(false);
  const showUpdateModal = () => {
    setDisplayUpdateModal(true);
  };
  const hideUpdateModal = () => {
    setDisplayUpdateModal(false);
  };
  const [valueRoleModal, setValueRoleModal] = useState<{
    id:"",
    email: "",
    firstname: "",
    lastname: "",
    age: "",
    pronoun: "",
    department: ""
    role:""}>();
  const showUpdateRole = (item: {
    id: "",
     email: "",
  firstname: "",
  lastname: "",
  age: "",
  pronoun: "",
  department: ""
  role:"" }) => {
    setDisplayUpdateModal(true);
    setValueRoleModal(item);
  };
  const onSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setUserList((prev) => ({
      ...prev,
      name: value,
    }));
  };
  const handleUpdateRole = async () => {
    setLoading(true);
    try {
      if (userList) {
        {
          axios
            .put('http://localhost:8080/cate/update', {
              id: valueRoleModal?.id,
              email: valueRoleModal?.email,
  firstname: valueRoleModal?.firstname,
  lastname: valueRoleModal?.lastname,
  age: valueRoleModal?.age,
  pronoun: valueRoleModal?.pronoun,
  department: valueRoleModal?.department,
  role:valueRoleModal?.role,
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
                <Th fontSize={16}>Department</Th>
                <Th fontSize={16}>Role</Th>
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
                  <Td>{item.department}</Td>
                  <Td>{item.role}</Td>
                  <Td>Open</Td>
                  <Td justifyItems="center">
                    <Icon
                      as={AiFillEdit}
                      fontSize={40}
                      color="gray.400"
                      _hover={{ color: 'blue.300' }}
                      ml="20px"
                      onClick={() =>
                        showUpdateRole(item)
                      }
                    />

                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <UpdateRole
      showModal = {showUpdateModal}
      hideModal = {hideUpdateModal}
      onChange = {onSelectChange}
      loading = {loading}
      Update = {handleUpdateRole}
      userData ={valueRoleModal} />
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
