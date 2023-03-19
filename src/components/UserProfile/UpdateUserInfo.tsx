import { Client } from '@/atoms/clientAtom';
import { FIREBASE_ERROR } from '@/Firebase/error';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
  Box,
  Image,
  Input,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
type Department = {
  id: number;
  name: string;
  department_info: string;
  isDeleted: boolean;
};

type updateUserProps = {
  showModal: any;
  hideModal: any;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  loading: boolean;
  Update: (event: React.FormEvent<HTMLFormElement>) => void;
  userData?: Client;
};
const UpdateUserInfo: React.FC<updateUserProps> = ({
  showModal,
  hideModal,
  Update,
  onChange,
  loading,
  userData,
}) => {
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  useEffect(() => {
    axios.get('http://localhost:8080/department').then((response) => {
      console.log('get all departments: ', response);
      setAllDepartments(response.data);
    });
  }, []);
  return (
    <>
      <Modal isOpen={showModal} onClose={hideModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Info</ModalHeader>
          <ModalBody pb={6}>
            <form onSubmit={Update}>
              <Flex direction="row">
                <Input
                  required
                  name="firstname"
                  placeholder="First Name"
                  type="text"
                  defaultValue={userData?.firstname}
                  mb={2}
                  mr="3pt"
                  onChange={onChange}
                  fontSize="10pt"
                  height="35px"
                  _hover={{
                    bg: 'white',
                    border: '2px solid',
                    borderColor: 'brand.500',
                  }}
                  _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'brand.900',
                  }}
                  bg="gray.50"
                ></Input>

                <Input
                  required
                  name="lastname"
                  placeholder="Last Name"
                  type="text"
                  mb={2}
                  defaultValue={userData?.lastname}
                  onChange={onChange}
                  fontSize="10pt"
                  height="35px"
                  _hover={{
                    bg: 'white',
                    border: '2px solid',
                    borderColor: 'brand.500',
                  }}
                  _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'brand.900',
                  }}
                  bg="gray.50"
                ></Input>
              </Flex>
              <Flex direction="row">
                <Input
                  required
                  name="age"
                  placeholder="Age"
                  type="number"
                  mb={2}
                  mr={1}
                  flex={0.72}
                  onChange={onChange}
                  defaultValue={userData?.age}
                  fontSize="10pt"
                  height="35px"
                  _hover={{
                    bg: 'white',
                    border: '2px solid',
                    borderColor: 'brand.500',
                  }}
                  _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'brand.900',
                  }}
                  bg="gray.50"
                ></Input>
                <Select
                  placeholder="Pronoun"
                  mb={2}
                  flex={1}
                  name="pronoun"
                  fontSize="10pt"
                  height="35px"
                  defaultValue={userData?.pronoun}
                  onChange={onChange}
                  _hover={{
                    bg: 'white',
                    border: '2px solid',
                    borderColor: 'brand.500',
                  }}
                  _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'brand.900',
                  }}
                  bg="gray.50"
                  color="gray.500"
                >
                  <option value="HE_HIM">He/Him</option>
                  <option value="SHE_HER">She/Her</option>
                  <option value="THEY_THEM">They/Them</option>
                </Select>
              </Flex>
              <Select
                placeholder="Select Department"
                mb={2}
                name="department"
                onChange={onChange}
                defaultValue={userData?.department.id}
                fontSize="10pt"
                height="35px"
                _hover={{
                  bg: 'white',
                  border: '2px solid',
                  borderColor: 'brand.500',
                }}
                _focus={{
                  outline: 'none',
                  bg: 'white',
                  border: '1px solid',
                  borderColor: 'brand.900',
                }}
                bg="gray.50"
                color="gray.500"
              >
                {allDepartments.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>

              {/* {(formError || userError) && (
                <Text textAlign="center" color="red" fontSize="10pt" mb={2}>
                  {formError ||
                    FIREBASE_ERROR[
                      userError?.message as keyof typeof FIREBASE_ERROR
                    ]}
                </Text>
              )} */}
              <Flex
                direction="column"
                fontSize="9pt"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  height="30px"
                  variant="primary"
                  type="submit"
                  isLoading={loading}
                  loadingText="Updating"
                  spinnerPlacement="start"
                  _loading={{ opacity: 2 }}
                >
                  Update{''}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UpdateUserInfo;
