import React from 'react';
import PageContent from '@/components/Layout/PageContent';
import { Box, Text } from '@chakra-ui/react';
import NewPostForm from '@/components/Posts/NewPostForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/Firebase/clientApp';

const Submit: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <Box p="14px 8px" borderBottom="2px solid" borderColor="white">
          <Text fontSize={22} fontWeight={900}>
            Create a post
          </Text>
        </Box>
        <Box height={400}>{user && <NewPostForm user={user} />}</Box>
      </>
      <></>
    </PageContent>
  );
};
export default Submit;
