import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, Icon, Flex, MenuDivider, Text } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import {BsPersonCircle} from "react-icons/bs";
import {FiMenu} from "react-icons/fi";
import {ImProfile} from "react-icons/im"
import {BiUserPlus, BiLogIn, BiLogOut} from "react-icons/bi"
import { auth } from "@/Firebase/clientApp";


type UserMenuProps = {
  user?: User | null;
};
const UserMenu: React.FC<UserMenuProps> = ({user}) =>{
  return (
    <Menu>
  <MenuButton >
    {user ? (
      
      <Flex display="flex" align="center">
      <Flex align="center">
          <>
          <Icon as={BsPersonCircle} fontSize={25} color="gray.200"  />
          </>
          <ChevronDownIcon color="gray.200" _hover={{color:"brand.800"}}/>
        </Flex>
      </Flex>
    ) : (
      <Flex display={{base: "block", md: "none"}} align="center">
      <Flex align="center">
          <>
          <Icon as={FiMenu} fontSize={25} color="brand.800"  />
          </>
        </Flex>
      </Flex>
    )}
  </MenuButton>
  <MenuList width={5}>
  {user ? (
    <>
   
      <Flex 
        alignItems="center"
        justifyContent="center" direction="column">
          <Icon as={BsPersonCircle} fontSize={40}   />
          <Text fontSize={12} fontWeight={700}>
            {user?.displayName || user.email}
          </Text>
      </Flex>
      <MenuDivider />
    <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{bg: "gray.200", color: "brand.800" }}>
            <Flex align="center">
              <Icon fontSize={23} mr={2} ml={1} as={ImProfile} />
              Your Profile
            </Flex>
          </MenuItem><MenuDivider /><MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{bg: "gray.200", color: "brand.800" }}
            onClick={() => signOut(auth)}>
              <Flex align="center">
                <Icon fontSize={30} mr={2} as={BiLogOut} />
                Log Out
              </Flex>
            </MenuItem></>
  ) : (
    <><MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{bg: "gray.200", color: "brand.800" }}>
            <Flex align="center">
              <Icon fontSize={31} mr={2} as={BiLogIn} />
              Log In 
            </Flex>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{ color: "brand.800" }}
            >
              <Flex align="center">
                <Icon fontSize={32} mr={1} ml="5pt" as={BiUserPlus} />
                Sign Up
              </Flex>
            </MenuItem></>
  )}
  </MenuList>
</Menu>
  )
};
export default UserMenu;