import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Topic } from '@/atoms/topicAtom';
import useTopics from '@/hooks/useTopics';
import { Client } from '@/atoms/clientAtom';
import { FaUserCircle } from 'react-icons/fa';
import { TbCameraPlus } from 'react-icons/tb';
import { auth, storage } from '@/Firebase/clientApp';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage';
import UploadUserPhoto from './UploadUserPhoto';
import { updateProfile, User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

type HeaderProps = {
  userData: Client;
};

const UserHeader: React.FC<HeaderProps> = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [displayUpload, setDisplayUpload] = useState(false);
  const showModal = () => {
    setDisplayUpload(true);
  };
  const hideModal = () => {
    setDisplayUpload(false);
  };
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result as string);
    };
  };
  useEffect(() => {
    if (user?.photoURL) {
      setSelectedFile(user.photoURL);
    }
  }, [user]);

  const upload = async () => {
    setLoading(true);
    if (selectedFile != user?.photoURL && selectedFile != '') {
      const imageRef = ref(storage, `ProfilePhoto/` + user?.uid);
      uploadString(imageRef, selectedFile, 'data_url').then(async (result) => {
        console.log('result of uploading image ====>', user?.uid);
        const photoURL = await getDownloadURL(imageRef);
        updateProfile(user, { photoURL });
        setLoading(false);
        hideModal();
        window.location.reload();
        console.log('result of uploading image ====>', user?.photoURL);
      });
    } else {
      updateProfile(user, { photoURL: '' });
      setLoading(false);
      hideModal();
      window.location.reload();
      console.log('result of uploading image ====>', user?.photoURL);
    }
  };
  return (
    <>
      <Flex direction="column" width="100%" height="156px">
        <Box height="70%" bgGradient="linear(to-r, brand.900, brand.800)"></Box>
        <Flex justify="center" flexGrow={1} bg="white">
          <Flex width="95%" maxWidth="860px">
            {user?.photoURL ? (
              <Flex
                direction="column"
                position="relative"
                top={-3}
                borderRadius="50%"
              >
                <Flex>
                  <Image
                    src={user?.photoURL}
                    height="60pt"
                    width="58pt"
                    bg="white"
                    color="brand.500"
                    borderRadius="50%"
                  />
                </Flex>
                <Flex align="center" justify="flex-end">
                  <Icon
                    as={TbCameraPlus}
                    top={-4}
                    fontSize={24}
                    position="relative"
                    cursor="pointer"
                    bg="black"
                    color="brand.800"
                    border="2px solid black"
                    borderRadius="50%"
                    onClick={() => showModal()}
                  ></Icon>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex
                  direction="column"
                  position="relative"
                  top={-3}
                  borderRadius="50%"
                >
                  <Flex>
                    <Image
                      src="/images/defaultProfile.jpg"
                      height="60pt"
                      width="60pt"
                      bg="white"
                      color="brand.500"
                      borderRadius="50%"
                    />
                  </Flex>
                  <Flex align="center" justify="flex-end">
                    <Icon
                      as={TbCameraPlus}
                      top={-4}
                      fontSize={24}
                      position="relative"
                      cursor="pointer"
                      bg="black"
                      color="brand.800"
                      border="2px solid black"
                      borderRadius="50%"
                      onClick={() => showModal()}
                    ></Icon>
                  </Flex>
                </Flex>
              </>
            )}
            <Flex padding="10px 16px">
              <Flex direction="column" mr={6}>
                <Text fontWeight={800} fontSize="20pt">
                  {user?.displayName || user?.email}
                </Text>
                <Text fontWeight={500} color="brand.900" fontSize="9pt">
                  {userData.ideas.length} ideas{' '}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <UploadUserPhoto
        showModal={displayUpload}
        hideModal={hideModal}
        upload={upload}
        loading={loading}
        selectedFile={selectedFile}
        onSelectImage={onSelectImage}
        setSelectedFile={setSelectedFile}
      />
    </>
  );
};
export default UserHeader;
