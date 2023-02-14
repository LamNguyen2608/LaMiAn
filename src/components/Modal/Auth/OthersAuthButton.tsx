import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {auth} from '../../../Firebase/clientApp'

const OthersAuthButton: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
      <Flex direction="column" display="flex" width="90%" height="30px" mb={2} justifyContent="center" alignItems="center">
          <Button
          width={{base: "190px", sm: "190px", md: "190px"}}
           variant="authenticate" isLoading={loading} onClick={() => signInWithGoogle()}>
            <Image src="/images/google logo.png" height="20px" mr={1}></Image>
            Continue with Google
          </Button>
          {error && <Text>{error.message}</Text>}
      </Flex>
  )
}

export default OthersAuthButton;