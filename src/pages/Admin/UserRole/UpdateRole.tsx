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
  import React, { useEffect, useState } from 'react';
  
  type updateRoleProps = {
    showModal: any;
    hideModal: any;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    loading: boolean;
    Update: () => void;
    userData?: {
        email: "",
        firstname: "",
        lastname: "",
        age: "",
        pronoun: "",
        department: ""
        role: "",
    };
  };
  const UpdateRole: React.FC<updateRoleProps> = ({
    showModal,
    hideModal,
    Update,
    onChange,
    loading,
    userData,
  }) => {
  
    return (
      <>
        <Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Role</ModalHeader>
            <ModalBody pb={6}>
              <Text
                mb={2}
                mt={2}
                fontSize={20}
                fontWeight={900}
                color="blackAlpha.600"
              >
                User Role
              </Text>
 
              <Select
        placeholder='Select Role'
        mb={2}
        name="department"
        onChange={onChange}
        defaultValue={userData?.role}
        fontSize="10pt"
        height="35px"
        _hover={{
          bg: "white",
          border: "2px solid",
          borderColor: "brand.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "brand.900"
        }}
        bg="gray.50"
        color="gray.500">
          <option value=""></option>
      </Select>
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
  export default UpdateRole;
  