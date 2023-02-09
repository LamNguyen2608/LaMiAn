import { authModalState } from "@/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import Login from "./Auth/Login";

type AuthInputProps = {
  
};
const AuthInputs: React.FC<AuthInputProps> = () => {
  const modalState = useRecoilValue(authModalState)
  return (
    <Flex direction='column' align='center' width ='100%' mt={4}>
       {modalState.view === 'login' && <Login />}
    </Flex>
  )
}

export default AuthInputs;