import { Idea } from '@/atoms/ideaAtom';
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
  hideModal: () => void;
  confirmModal: () => void;
};
const DeleteCommentModal: React.FC<deleteProps> = ({
  showModal,
  hideModal,
  confirmModal
}) => {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Comment Confirmation</ModalHeader>
          <ModalBody pb={6}>Are you sure you want to delete this comment?</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              spinnerPlacement="start"
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
export default DeleteCommentModal;
