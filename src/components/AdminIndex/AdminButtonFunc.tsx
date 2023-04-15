import {
  Box,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import router from 'next/router';
import React, { useState } from 'react';
import { AiOutlineApartment } from 'react-icons/ai';
import { BsInfoCircleFill } from 'react-icons/bs';
import { CgUserList } from 'react-icons/cg';
import { FaUsersCog } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { RiPagesFill } from 'react-icons/ri';
import CreateCategory from '../../pages/Admin/Category/CreateCategory';

type buttonProps = {
  isAdmin: boolean
}

const AdminButtonFunc: React.FC<buttonProps> = ({ isAdmin }) => {
  return (
    <>
      <Flex align="center" height="100%" p="5px 0px" justify="center" direction="column" bg="#222629">
        <Flex align="center" p="5px 0px" direction="row" >
          <Box
            display={isAdmin ? "block" : "none"}
            alignItems="center"
            as="button"
            color="white"
            fontWeight="bold"
            fontSize={{ base: '11px', sm: '13px' }}
            height={{ base: '80px', sm: '110px', md: '130px' }}
            width={{ base: '80px', sm: '110px', md: '130px', xl: '150px' }}
            borderRadius="20px"
            bgGradient="linear(to-r, brand.900, brand.800)"
            _hover={{
              bgGradient: 'linear(to-r, brand.100, brand.200)',
            }}
            onClick={() => {
              router.push('/Admin/UserRole/UserList');
            }}
          >
            <Icon as={FaUsersCog} fontSize={60} color="white" />
            <Text fontSize={20} fontWeight={900}>
              Manage User
            </Text>
          </Box>
          <Box
            // display={{ base: "none", sm: "none", md:"block" }}
            alignItems="center"
            as="button"
            color="white"
            ml={6}
            fontWeight="bold"
            fontSize={{ base: '11px', sm: '13px' }}
            height={{ base: '80px', sm: '110px', md: '130px' }}
            width={{ base: '80px', sm: '110px', md: '130px', xl: '150px' }}
            borderRadius="20px"
            bgGradient="linear(to-r, brand.900, brand.800)"
            _hover={{
              bgGradient: 'linear(to-r, brand.100, brand.200)',
            }}
            onClick={() => {
              router.push('/Admin/Topic');
            }}
          >
            <Icon as={RiPagesFill} fontSize={60} color="white" />
            <Text fontSize={20} fontWeight={900}>
              Manage topic
            </Text>
          </Box>
        </Flex>

        <Flex align="center" p="5px 0px" direction="row" display={isAdmin ? "block" : "none"}>
          <Box
            // display={{ base: "none", sm: "none", md:"block" }}
            alignItems="center"
            as="button"
            color="white"
            fontWeight="bold"
            fontSize={{ base: '11px', sm: '13px' }}
            height={{ base: '80px', sm: '110px', md: '130px' }}
            width={{ base: '80px', sm: '110px', md: '130px', xl: '150px' }}
            borderRadius="20px"
            bgGradient="linear(to-r, brand.900, brand.800)"
            _hover={{
              bgGradient: 'linear(to-r, brand.100, brand.200)',
            }}
            onClick={() => {
              router.push('/Admin/Category');
            }}
          >
            <Icon as={MdCategory} fontSize={60} color="white" />
            <Text fontSize={20} fontWeight={900}>
              Manage category
            </Text>
          </Box>
          <Box
            // display={{ base: "none", sm: "none", md:"block" }}
            alignItems="center"
            as="button"
            color="white"
            ml={6}
            fontWeight="bold"
            fontSize={{ base: '11px', sm: '13px' }}
            height={{ base: '80px', sm: '110px', md: '130px' }}
            width={{ base: '80px', sm: '110px', md: '130px', xl: '150px' }}
            borderRadius="20px"
            bgGradient="linear(to-r, brand.900, brand.800)"
            _hover={{
              bgGradient: 'linear(to-r, brand.100, brand.200)',
            }}
            onClick={() => {
              router.push('/Admin/Department');
            }}
          >
            <Icon as={AiOutlineApartment} fontSize={60} color="white" />
            <Text fontSize={20} fontWeight={900}>
              Manange department
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
export default AdminButtonFunc;
