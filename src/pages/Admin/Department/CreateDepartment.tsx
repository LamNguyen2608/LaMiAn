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
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type depProps = {
  department?: {
    name: string;
    department_info: string;
  };
  showModal: any;
  hideModal: any;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  loading: boolean;
  Create: () => void;
};
const CreateDepartment: React.FC<depProps> = ({
  showModal,
  hideModal,
  Create,
  onChange,
  loading,
  department,
}) => {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new Department</ModalHeader>
          <ModalBody pb={6}>
            <Text
              mb={2}
              mt={2}
              fontSize={20}
              fontWeight={900}
              color="blackAlpha.600"
            >
              Department name
            </Text>
            <Input
              name="name"
              onChange={onChange}
              fontSize="14pt"
              placeholder="Name..."
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
            <Text
              mb={2}
              mt={2}
              fontSize={20}
              fontWeight={900}
              color="blackAlpha.600"
            >
              Department Info
            </Text>
            <Textarea
              name="department_info"
              fontSize="14pt"
              onChange={onChange}
              placeholder="Info..."
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
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              loadingText="Creating"
              width="90px"
              spinnerPlacement="start"
              isLoading={loading}
              _loading={{ opacity: 2 }}
              mr={3}
              onClick={() => Create()}
            >
              Create
            </Button>
            <Button onClick={hideModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateDepartment;
