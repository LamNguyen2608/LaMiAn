import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  MenuDivider,
  Text,
  Image,
} from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { BiUserPlus, BiLogIn, BiLogOut } from 'react-icons/bi';
import { auth } from '@/Firebase/clientApp';
import { authModalState } from '@/atoms/authModalAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import router from 'next/router';
import { Client, clientState } from '@/atoms/clientAtom';
import { FaUserAstronaut } from 'react-icons/fa';

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Menu>
      <MenuButton>
        {user ? (
          <Flex display="flex" align="center">
            <Flex align="center">
              <>
                <Icon as={FaUserAstronaut} fontSize={25} color="gray.200" />
              </>
              <ChevronDownIcon
                color="gray.200"
                _hover={{ color: 'brand.800' }}
              />
            </Flex>
          </Flex>
        ) : (
          <Flex display={{ base: 'block', md: 'none' }} align="center">
            <Flex align="center">
              <>
                <Icon as={FiMenu} fontSize={25} color="brand.800" />
              </>
            </Flex>
          </Flex>
        )}
      </MenuButton>
      <MenuList width={3} mt="6px">
        {user ? (
          <>
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              {user?.photoURL ? (
                <>
                  <Image
                    src={user?.photoURL}
                    height="60pt"
                    width="58pt"
                    bg="white"
                    color="brand.500"
                    borderRadius="50%"
                  />
                </>
              ) : (
                <>
                  <Image
                    src="/images/defaultProfile.jpg"
                    height="60pt"
                    width="60pt"
                    bg="white"
                    color="brand.500"
                    borderRadius="50%"
                  />
                </>
              )}

              <Text fontSize={12} fontWeight={700}>
                {user?.displayName || user.email}
              </Text>
            </Flex>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: 'gray.200', color: 'brand.800' }}
              onClick={(e) => router.push('/Profile/' + user.uid)}
            >
              <Flex align="center">
                <Icon fontSize={23} mr={2} ml={1} as={ImProfile} />
                Your Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: 'gray.200', color: 'brand.800' }}
              onClick={() => signOut(auth)}
            >
              <Flex align="center">
                <Icon fontSize={30} mr={2} as={BiLogOut} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: 'gray.200', color: 'brand.800' }}
              onClick={() => setAuthModalState({ open: true, view: 'login' })}
            >
              <Flex align="center">
                <Icon fontSize={31} mr={2} as={BiLogIn} />
                Log In
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ color: 'brand.800' }}
              onClick={() => setAuthModalState({ open: true, view: 'signup' })}
            >
              <Flex align="center">
                <Icon fontSize={32} mr={1} ml="5pt" as={BiUserPlus} />
                Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
