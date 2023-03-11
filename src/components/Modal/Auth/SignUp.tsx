import { authModalState } from "@/atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../../Firebase/clientApp'
import { FIREBASE_ERROR } from '../../../Firebase/error'
import { Input, Button, Flex, Text, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";

type Department = {
  "id": number,
  "name": string,
  "department_info": string,
  "isDeleted": boolean
}

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
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
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
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
    console.log(signUpForm);
    if (formError) setformError("");
    if (signUpForm.password !== signUpForm.confirmPass) {
      setformError("Password does not match");
      return;
    }
    //password matching
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
      .then((user) => {
        if (user) {
          console.log("====>", user.user.uid);
          axios.post('http://localhost:8080/client/signup', {
            id: user.user.uid,
            firstname: signUpForm.firstname,
            lastname: signUpForm.lastname,
            age: signUpForm.age,
            pronoun: signUpForm.pronoun,
            department_id: signUpForm.department,
            email: user.user.email
          })
            .then(response => {
              console.log("after create client ===>", response);
            });
        }
      }
      );

  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update form state
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <form onSubmit={onSubmit}>
      <Flex direction="row">
        <Input
          required
          name="firstname"
          placeholder="First Name"
          type="text"
          mb={2}
          mr="3pt"
          onChange={onChange}
          fontSize="10pt"
          height="35px"
          _hover={{
            bg: "white",
            border: "2px solid",
            borderColor: "brand.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
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
          fontSize="10pt"
          height="35px"
          _hover={{
            bg: "white",
            border: "2px solid",
            borderColor: "brand.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "brand.900"
          }}
          bg="gray.50"
        >
        </Input>
      </Flex>
      <Flex direction="row">
        <Input
          required
          name="age"
          placeholder="Age"
          type="number"
          mb={2}
          mr={1}
          flex={0.72}
          onChange={onChange}
          fontSize="10pt"
          height="35px"
          _hover={{
            bg: "white",
            border: "2px solid",
            borderColor: "brand.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "brand.900"
          }}
          bg="gray.50"
        >
        </Input>
        <Select
          placeholder='Pronoun'
          mb={2}
          flex={1}
          name="pronoun"
          fontSize="10pt"
          height="35px"
          onChange={onChange}
          _hover={{
            bg: "white",
            border: "2px solid",
            borderColor: "brand.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "brand.900"
          }}
          bg="gray.50"
          color="gray.500">
          <option value='HE_HIM'>He/Him</option>
          <option value='SHE_HER'>She/Her</option>
          <option value='THEY_THEM'>They/Them</option>
        </Select>
      </Flex>
      <Input
        required
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        height="35px"
        _hover={{
          bg: "white",
          border: "2px solid",
          borderColor: "brand.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "brand.900"
        }}
        bg="gray.50"
      >
      </Input>
      <Select
        placeholder='Select Department'
        mb={2}
        name="department"
        onChange={onChange}
        fontSize="10pt"
        height="35px"
        _hover={{
          bg: "white",
          border: "2px solid",
          borderColor: "brand.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "brand.900"
        }}
        bg="gray.50"
        color="gray.500">
        {allDepartments.map(item => (
          <option value={item.id}>{item.name}</option>
        ))}
      </Select>
      <Input
        required
        name="password"
        placeholder="Password"
        type="password"
        mb={2}
        height="35px"
        onChange={onChange}
        fontSize="10pt"
        _hover={{
          bg: "white",
          border: "2px solid",
          borderColor: "brand.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
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
        fontSize="10pt"
        _hover={{
          bg: "white",
          border: "2px solid",
          borderColor: "brand.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
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
          _loading={{ opacity: 2 }}>Sign up </Button>
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