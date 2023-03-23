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
    event: React.ChangeEvent<HTMLInputElement>
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
    axios.get('https://backend-2tza.onrender.com/department').then((response) => {
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
                <Flex direction="column">
                  <Text
                    mb={2}
                    mt={2}
                    fontSize={20}
                    fontWeight={900}
                    color="blackAlpha.600"
                  >
                    First name:
                  </Text>
                  <Input
                    name="firstname"
                    onChange={onChange}
                    defaultValue={userData?.firstname}
                    fontSize="14pt"
                    placeholder="Firstname"
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
                </Flex>
                <Flex direction="column">
                  <Text
                    mb={2}
                    mt={2}
                    fontSize={20}
                    fontWeight={900}
                    color="blackAlpha.600"
                  >
                    Last name:
                  </Text>
                  <Input
                    name="lastname"
                    onChange={onChange}
                    defaultValue={userData?.lastname}
                    fontSize="14pt"
                    placeholder="Lastname"
                    ml={4}
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
                </Flex>
              </Flex>
              <Text
                mb={2}
                mt={2}
                fontSize={20}
                fontWeight={900}
                color="blackAlpha.600"
              >
                Age:
              </Text>
              <Input
                name="age"
                onChange={onChange}
                defaultValue={userData?.age}
                fontSize="14pt"
                placeholder="Age"
                width="40%"
                mb={4}
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
