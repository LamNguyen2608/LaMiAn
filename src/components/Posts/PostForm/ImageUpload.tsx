import { Button, Flex, Image, Input, Stack, Text } from '@chakra-ui/react';
import React, { useRef } from 'react';

type ImageUploadProps = {
  selectedFile?: string;
  selectedFileName?: string;
  type?: string;
  setSelectedType: (value: string) => void;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
  setSelectedName: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  selectedFileName,
  onSelectImage,
  setSelectedFile,
  setSelectedTab,
  setSelectedType,
  setSelectedName,
  type,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  function removeFile() {
    setSelectedFile('');
    setSelectedType('');
  }
  function setFile() {
    if (type === 'Word') {
      return (
        <>
          <Image
            src="https://static.javatpoint.com/msword/images/word-tutorial.png"
            maxWidth="50%"
            maxHeight="50%"
          />
        </>
      );
    }
    if (type === 'Excel') {
      return (
        <>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/1200px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png"
            maxWidth="40%"
            maxHeight="40%"
          />
        </>
      );
    } else {
      return (
        <>
          <Image src={selectedFile} maxWidth="80%" maxHeight="80%" />
        </>
      );
    }
  }

  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile || type ? (
        <>
          {setFile()}
          <Flex>
            <Text fontSize="9pt">{selectedFileName}</Text>
          </Flex>
          <Flex direction="row" align="center">
            <Button
              mt={4}
              height="36px"
              width="120px"
              variant="primary"
              type="submit"
              onClick={() => removeFile()}
            >
              Remove File
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
