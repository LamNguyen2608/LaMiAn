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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

type updateDepProps = {
  showModal: any;
  hideModal: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  Update: () => void;
  depData?: {
    id?: number;
    name: string;
    department_info: string;
  };
};
const UpdateDepartment: React.FC<updateDepProps> = ({
  showModal,
  hideModal,
  Update,
  onChange,
  loading,
  depData,
}) => {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update department "{depData?.name}"</ModalHeader>
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
              defaultValue={depData?.name}
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
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              loadingText="Updating"
              width="90px"
              spinnerPlacement="start"
              isLoading={loading}
              _loading={{ opacity: 2 }}
              mr={3}
              onClick={() => Update()}
            >
              Update
            </Button>
            <Button onClick={hideModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UpdateDepartment;
