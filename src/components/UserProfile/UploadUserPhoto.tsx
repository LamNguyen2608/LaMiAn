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
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

type userProps = {
  selectedFile?: string;
  showModal: any;
  hideModal: any;
  loading: boolean;
  upload: () => void;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: (value: string) => void;
};
const UploadUserPhoto: React.FC<userProps> = ({
  showModal,
  hideModal,
  upload,
  loading,
  selectedFile,
  onSelectImage,
  setSelectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload User Profile Picture</ModalHeader>
          <ModalBody pb={6}>
            <Flex
              direction="column"
              mt={3}
              justify="center"
              align="center"
              width="100%"
            >
              {selectedFile ? (
                <>
                  <Image src={selectedFile} maxWidth="50%" maxHeight="50%" />
                  <Flex direction="row" align="center">
                    <Button
                      mt={4}
                      height="36px"
                      width="120px"
                      variant="primary"
                      type="submit"
                      onClick={() => setSelectedFile('')}
                    >
                      Remove Image
                    </Button>
                  </Flex>
                </>
              ) : (
                <>
                  <Stack spacing={3} width="100%">
                    <Flex
                      justify="center"
                      align="center"
                      p={20}
                      border="2px dashed"
                      borderColor="brand.600"
                      borderRadius={4}
                      width="100%"
                    >
                      <Button
                        height="34px"
                        width="80px"
                        variant="primary"
                        type="submit"
                        onClick={() => selectedFileRef.current?.click()}
                      >
                        Upload
                      </Button>
                      <Input
                        ref={selectedFileRef}
                        type="file"
                        hidden
                        onChange={onSelectImage}
                      />
                      <img src={selectedFile} />
                    </Flex>
                    <Flex justify="flex-end"></Flex>
                  </Stack>
                </>
              )}
            </Flex>
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
              onClick={() => upload()}
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
export default UploadUserPhoto;
