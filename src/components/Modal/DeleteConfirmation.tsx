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
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

type deleteProps = {
  showModal: boolean;
  hideModal: any;
  deleteWhat?: string;
  loading: boolean;
  confirmModal: () => void;
  CategoryData?: {
    id?: number;
    name: string;
  };
};
const DeleteConfirmationModal: React.FC<deleteProps> = ({
  showModal,
  hideModal,
  confirmModal,
  loading,
  CategoryData,
}) => {
  const DeleteConfirmationModal: React.FC<deleteProps> = ({ showModal, hideModal, confirmModal, deleteWhat }) => {


    return (
    <>
        <Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Confirmation</ModalHeader>
            <ModalBody pb={6}>
              Are you sure you want to delete this {deleteWhat}?
            </ModalBody>
            <Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Confirmation</ModalHeader>
                <ModalBody pb={6}>Are you sure you want to delete this?</ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="red"
                    mr={3}
                    spinnerPlacement="start"
                    isLoading={loading}
                    _loading={{ opacity: 2 }}
                    onClick={() => confirmModal()}
                  >
                    Confirm
                  </Button>
                  <Button onClick={hideModal}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          );
};
          export default DeleteConfirmationModal;
