import { authModalState } from "@/atoms/authModalAtom";
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '../../../Firebase/clientApp'
import {FIREBASE_ERROR} from '../../../Firebase/error'
import { Input, Button, Flex, Text, position } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email:"", 
    password:"",
    confirmPass:"",
  });
  const [formError, setformError] = useState("");
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    userError,
  ] = useCreateUserWithEmailAndPassword(auth);
  //Firebase 
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //set Error
    if (formError) setformError("");
    if (signUpForm.password !== signUpForm.confirmPass){
        setformError("Password does not match");
        return;
    }
    //password matching
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update form state
    setSignUpForm((prev) => ({
      ...prev, 
     [event.target.name]: event.target.value
    }));
  };
  const setAuthModalState = useSetRecoilState(authModalState);
  return(
      <form onSubmit={onSubmit}>
       <Input
        required
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize ="11pt"
        height="35px"
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
        name="password"
        placeholder="Password"
        type="password"
        mb={2}
        height="35px"
        onChange={onChange}
        fontSize ="11pt"
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
        height="35px"
        onChange={onChange}
        fontSize ="11pt"
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
        {(formError || userError) && (
        <Text textAlign="center" color="red" fontSize="10pt" mb={2}>
          {formError || FIREBASE_ERROR[userError?.message as keyof typeof FIREBASE_ERROR]}
        </Text>
        )}
        <Flex direction="column" fontSize="9pt" justifyContent="center" alignItems="center">
        <Button 
        height="30px" 
        variant="primary" 
        type="submit" 
        isLoading={loading}
        loadingText='Signing up'
        spinnerPlacement="start"
        _loading= {{opacity:2}}>Sign up </Button>
        <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1} mt={2}> Already have an account?</Text>
          <Text
          color="brand.500"
          fontWeight='bold'
          mt={2}
          cursor="pointer"
          onClick={() => setAuthModalState((prev) => ({
            ...prev, 
            view: "login", 
            }))
          }>
            Log In
          </Text>
          </Flex>
        </Flex>
      </form>
  )
};

export default SignUp;