import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/Firebase/clientApp";
import { FIREBASE_ERROR } from "@/Firebase/error";
import { border, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

type LoginProps = {
};

const Login:React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email:"", 
    password:"",
  });
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  //Firebase 
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password)
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update form state
    setLoginForm(prev => ({
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
        placeholder="email"
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
        placeholder="password"
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
        <Flex direction="column" fontSize="9pt" justifyContent="center" alignItems="center">
        <Text textAlign="center" color="red" fontSize="10pt" mb={2}>
          {FIREBASE_ERROR[error?.message as keyof typeof FIREBASE_ERROR]}
          </Text>
        <Button 
        height="30px" 
        variant="primary" 
        type="submit"
        isLoading={loading}
        loadingText='Logging In'
        spinnerPlacement="start"
        _loading= {{opacity:2}}>Log In</Button>
        <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1} mt={2}> Don't have any account?</Text>
          <Text
          color="brand.500"
          fontWeight='bold'
          mt={2}
          cursor="pointer"
          onClick={() => setAuthModalState((prev) => ({
            ...prev, 
            view: "signup", 
            }))
          }>
            Sign Up
          </Text>
          </Flex>

          <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1} mt={2}> Forgot your password?</Text>
          <Text
          color="brand.500"
          fontWeight='bold'
          mt={2}
          cursor="pointer"
          onClick={() => setAuthModalState((prev) => ({
            ...prev, 
            view: "resetPassword", 
            }))
          }>
            Click here to resset
          </Text>
          </Flex>
        </Flex>
      </form>
  );
};
export default Login;