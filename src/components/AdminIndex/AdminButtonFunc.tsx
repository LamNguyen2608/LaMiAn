import { Box, Flex, Icon, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import router from "next/router";
import React, { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { MdCategory } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import CreateCategory from "../Modal/CreateCategory";

const AdminButtonFunc: React.FC = () => {
  
    return(
        <>
        <Box p="14px 8px" >
          <Text fontSize={22} fontWeight={900} >Others</Text>
        </Box>
        <Flex
        align="center"
        p="5px 0px"
        justify="center"
        direction="column"
       >
        <Flex
        align="center"
        p="5px 0px"
        direction="row"
       >
         <Box
                // display={{ base: "none", sm: "none", md:"block" }}
                alignItems="center"
                as='button'
                color='white'
                fontWeight='bold'
                fontSize={{ base: "11px", sm: "13px" }}
                height={{ base: "80px", sm: "110px", md:"150px" }}
                width={{ base: "80px", sm: "110px", md:"200px" }}
                borderRadius='20px'
                bgGradient='linear(to-r, brand.900, brand.800)'
                _hover={{
                    bgGradient: 'linear(to-r, brand.100, brand.200)',
                    
                }}
                onClick={() =>{router.push('/Admin/'  + '/UpdateRoleForm');}}
            >
              <Icon as={CgUserList} fontSize={80} color="white" />
              <Text fontSize={20} fontWeight={900} >Manage User</Text>
            </Box>
             <Box
                // display={{ base: "none", sm: "none", md:"block" }}
                alignItems="center"
                as='button'
                color='white'
                ml={6}
                fontWeight='bold'
                fontSize={{ base: "11px", sm: "13px" }}
                height={{ base: "80px", sm: "110px", md:"150px" }}
                width={{ base: "80px", sm: "110px", md:"200px" }}
                borderRadius='20px'
                bgGradient='linear(to-r, brand.900, brand.800)'
                _hover={{
                    bgGradient: 'linear(to-r, brand.100, brand.200)',
                    
                }}
                onClick={() =>{router.push('/Admin/' + '/Topic' + '/CreateTopicForm');}}
            >
              <Icon as={RiPagesFill} fontSize={80} color="white" />
              <Text fontSize={20} fontWeight={900} >Manage topic</Text>
            </Box>
        </Flex>

        <Flex
        align="center"
        p="5px 0px"
        direction="row"
       >
         <Box
                // display={{ base: "none", sm: "none", md:"block" }}
                alignItems="center"
                as='button'
                color='white'
                fontWeight='bold'
                fontSize={{ base: "11px", sm: "13px" }}
                height={{ base: "80px", sm: "110px", md:"150px" }}
                width={{ base: "80px", sm: "110px", md:"200px" }}
                borderRadius='20px'
                bgGradient='linear(to-r, brand.900, brand.800)'
                _hover={{
                    bgGradient: 'linear(to-r, brand.100, brand.200)',
                }}
                onClick={() =>{router.push('/Admin/' + '/Topic' + '/Category');}}
            >
              <Icon as={MdCategory} fontSize={70} color="white" />
              <Text fontSize={20} fontWeight={900} >Manage category</Text>
            </Box>
             <Box
                // display={{ base: "none", sm: "none", md:"block" }}
                alignItems="center"
                as='button'
                color='white'
                ml={6}
                fontWeight='bold'
                fontSize={{ base: "11px", sm: "13px" }}
                height={{ base: "80px", sm: "110px", md:"150px" }}
                width={{ base: "80px", sm: "110px", md:"200px" }}
                borderRadius='20px'
                bgGradient='linear(to-r, brand.900, brand.800)'
                _hover={{
                    bgGradient: 'linear(to-r, brand.100, brand.200)',
                    
                }}
                onClick={() =>{}}
            >
              <Icon as={BsInfoCircleFill} fontSize={70} color="white" />
              <Text fontSize={20} fontWeight={900} >Manange department</Text>
            </Box>
        </Flex>
        </Flex>
        </>
    );
};
export default AdminButtonFunc;