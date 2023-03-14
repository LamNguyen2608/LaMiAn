
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/Firebase/clientApp";
import { Input, Button, Text, Flex, Select, Box } from "@chakra-ui/react";
import axios from "axios";
import router, { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";


type Department = {
  "id": number,
  "name": string,
  "department_info": string,
  "isDeleted": boolean
}
const UpdateClientProfileForm: React.FC = () => {
  const [updateRoleForm, setUpdateRoleForm] = useState({
    email: "",
    password: "",
    confirmPass: "",
    firstname: "",
    lastname: "",
    age: "",
    pronoun: "",
    department: ""
  });
  const [formError, setformError] = useState("");
  const [allDepartments, setAllDepartments] = useState<Department>();
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    userError,
  ] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    axios.get("http://localhost:8080/department").then(
      response => {
        console.log("get all departments: ", response);
        setAllDepartments(response.data);
      }
    )
  }, [])

  //Firebase 
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //set Error
    console.log(updateRoleForm);
    if (formError) setformError("");
    if (updateRoleForm.password !== updateRoleForm.confirmPass) {
      setformError("Password does not match");
      return;
    }
    //password matching
    createUserWithEmailAndPassword(updateRoleForm.email, updateRoleForm.password)
      .then((user) => {
        if (user) {
          console.log("====>", user.user.uid);
          axios.post('http://localhost:8080/client/signup', {
            id: user.user.uid,
            firstname: updateRoleForm.firstname,
            lastname: updateRoleForm.lastname,
            age: updateRoleForm.age,
            pronoun: updateRoleForm.pronoun,
            department_id: updateRoleForm.department,
            email: user.user.email
          })
            .then(response => {
              console.log("after create client ===>", response);
            });
        }
      }
      );

  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //update form state
    setUpdateRoleForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Flex
    justify="center"
    p="10px 50px"
    direction="column">
    <Box p="14px 8px" >
          <Text fontSize={25} fontWeight={900} >Update role</Text>
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
   onChange={onChange}
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
   onChange={onChange}
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
   onChange={onChange}
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
     <Text
     color="brand.500"
     fontWeight='bold'
     mt={2}
     cursor="pointer"
     onClick={() =>{router.push('/index');}}>
       Back to Home
     </Text>
     </Flex>
   </Flex>
 </form>
 </Flex>
  );
};
 
export default UpdateClientProfileForm;