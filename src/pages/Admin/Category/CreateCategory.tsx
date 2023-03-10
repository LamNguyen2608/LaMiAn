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
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type catProps = {
  showModal: any;
  hideModal: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  Create: () => void;
};
const CreateCategory: React.FC<catProps> = ({
  showModal,
  hideModal,
  Create,
  onChange,
  loading,
}) => {
  const [category, setCategory] = useState<string>();

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new Category</ModalHeader>
          <ModalBody pb={6}>
            <Text
              mb={2}
              mt={2}
              fontSize={20}
              fontWeight={900}
              color="blackAlpha.600"
            >
              Category name
            </Text>
            <Input
              name="Cat_name"
              onChange={onChange}
              value={category}
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
export default CreateCategory;
