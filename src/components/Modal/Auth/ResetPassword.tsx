import React, { useState } from "react";
import { Button, Flex, Icon, Image, Input, Text } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../Firebase/clientApp";
import { useSetRecoilState } from "recoil";
import {BsDot, BsFillKeyFill}from "react-icons/bs"



const ResetPassword: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  };
  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Icon as={BsFillKeyFill} width="25pt" height="25pt"/>
      {success ? (
        <Text fontSize="11pt" mb={2}>Please go to your email and check for the reset password link.</Text>
      ) : (
        <>
          <Text fontSize="9pt" textAlign="center" mb={2}>
            Enter the email associated with your account and we will send you a
            reset link.
          </Text>
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
            <Input
              required
              name="email"
              placeholder="Email"
              type="email"
              mb={2}
              height="35px"
              onChange={(event) => setEmail(event.target.value)}
              fontSize="11pt"
              _placeholder={{ color: "gray.500" }}
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
            />
            <Text textAlign="center" fontSize="10pt" color="red">
              {error?.message}
            </Text>
            <Button
            variant="primary"
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              isLoading={sending}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems="center"
        fontSize="9pt"
        color="blue.500"
        fontWeight={700}
        cursor="pointer"
      >
        <Text
        color="brand.500"
        fontWeight='bold'
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOGIN
        </Text>
        <Icon as={BsDot} />
        <Text
        color="brand.500"
        fontWeight='bold'
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;