import { Button, Flex, Image, Input, Stack } from '@chakra-ui/react';
import React, { useRef } from 'react';

type ImageUploadProps = {
  selectedFile: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedFile,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Image src={selectedFile} maxWidth="80%" maxHeight="80%" />
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
            <Button
              mt={4}
              ml={3}
              height="36px"
              width="120px"
              variant="primary"
              onClick={() => setSelectedTab('Category')}
            >
              Next
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
            <Flex justify="flex-end">
              <Button
                justifySelf="flex-end"
                height="34px"
                width="80px"
                variant="primary"
                onClick={() => setSelectedTab('Category')}
              >
                Next
              </Button>
            </Flex>
          </Stack>
        </>
      )}
    </Flex>
  );
};

export default ImageUpload;
