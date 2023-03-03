
import { Input, Button, Text, Flex, Select, Box } from "@chakra-ui/react";
import router, { Router } from "next/router";
import React from "react";

const UpdateRoleForm: React.FC = () => {
  return (
    <Flex
    
    justify="center"
    p="10px 50px"
    direction="column">
    <Box p="14px 8px" >
          <Text fontSize={25} fontWeight={900} >Update new role</Text>
        </Box>
    <form >
    <Flex  direction="row">
   <Input
   required
   name="firstname"
   placeholder="First Name"
   type="text"
   mb={2}
   mr="3pt"
  //  onChange={}
   fontSize ="13pt"
   height="45px"
   _hover={{
     bg: "white",
     border:"2px solid", 
     borderColor: "brand.500", 
   }}
   _focus ={{
     outline: "none",
     bg:"white",
     border: "1px solid", 
     borderColor: "brand.900"
   }}
   bg="gray.50"
   >
   </Input>

   <Input
   required
   name="lastname"
   placeholder="Last Name"
   type="text"
   mb={2}
  //  onChange={}
   fontSize ="13pt"
   height="45px"
   _hover={{
     bg: "white",
     border:"2px solid", 
     borderColor: "brand.500", 
   }}
   _focus ={{
     outline: "none",
     bg:"white",
     border: "1px solid", 
     borderColor: "brand.900"
   }}
   bg="gray.50"
   >
   </Input>
   </Flex>
   
  <Input
   required
   name="email"
   placeholder="Email"
   type="email"
   mb={2}
  //  onChange={}
   fontSize ="13pt"
   height="45px"
   _hover={{
     bg: "white",
     border:"2px solid", 
     borderColor: "brand.500", 
   }}
   _focus ={{
     outline: "none",
     bg:"white",
     border: "1px solid", 
     borderColor: "brand.900"
   }}
   bg="gray.50"
   >
   </Input>
   <Select 
   placeholder='Select Role...'
    mb={2}
    fontSize ="13pt"
    height="45px"
    _hover={{
      bg: "white",
      border:"2px solid", 
      borderColor: "brand.500", 
    }}
    _focus ={{
      outline: "none",
      bg:"white",
      border: "1px solid", 
      borderColor: "brand.900"
    }}
    bg="gray.50"
    color="gray.500">
<option value=''>Manager</option>
</Select>
   <Input
   required
   name="password"
   placeholder="Password"
   type="password"
   mb={2}
   height="45px"
  //  onChange={}
   fontSize ="13pt"
   _hover={{
     bg: "white",
     border:"2px solid", 
     borderColor: "brand.500", 
   }}
   _focus ={{
     outline: "none",
     bg:"white",
     border: "1px solid", 
     borderColor: "brand.900"
   }}
   bg="gray.50">
   </Input>
   <Input
   required
   name="confirmPass"
   placeholder="Confirm Password"
   type="password"
   mb={2}
   height="45px"
  //  onChange={}
   fontSize ="13pt"
   _hover={{
     bg: "white",
     border:"2px solid", 
     borderColor: "brand.500", 
   }}
   _focus ={{
     outline: "none",
     bg:"white",
     border: "1px solid", 
     borderColor: "brand.900"
   }}
   bg="gray.50">
   </Input>
   <Flex direction="column" fontSize="9pt" justifyContent="center" alignItems="center">
   <Button 
   height="40px" 
   width="60%"
   variant="primary" 
   type="submit" 
  //  isLoading={loading}
   loadingText='Signing up'
   spinnerPlacement="start"
   _loading= {{opacity:2}}>Update </Button>
   <Flex fontSize="9pt" justifyContent="center">
     <Text mr={1} mt={2}> Already have a role?</Text>
     <Text
     color="brand.500"
     fontWeight='bold'
     mt={2}
     cursor="pointer"
     onClick={() =>{router.push('/Admin');}}>
       Back to Home
     </Text>
     </Flex>
   </Flex>
 </form>
 </Flex>
  );
};
 
export default UpdateRoleForm;