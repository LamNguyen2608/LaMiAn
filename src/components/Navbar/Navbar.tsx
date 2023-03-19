import { auth } from '@/Firebase/clientApp';
import { Flex, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import RightContent from './RightContent/RightContent';
import SearchInput from './Search/SearchInput';

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  return (
    <Flex bg="black" height="50px" padding="6px 10px">
      <Flex align="center" onClick={() => router.push('/')}>
        <Image src="/images/logo-02.png" height="40px" />
      </Flex>
      <SearchInput />
      {/* <Directory />*/}
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
