import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/Firebase/clientApp";
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Text, Box, Image } from "@chakra-ui/react";
import { m } from "framer-motion";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OthersAuthButton from "./OthersAuthButton";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [user, loading, error] = useAuthState(auth);
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) handleClose();
    console.log("user", user);
  }, [user]);
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex direction="row" borderEndRadius="15px">
            <Flex display={{ base: "none", sm: "flex" }} flex="1" bg="black" justifyContent="center" alignItems="center">
              <Image src="/images/logo-02.png" height="70px"></Image>
            </Flex>
            <Flex flex="2">
              <ModalCloseButton />
              <ModalBody
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                pb={6}>
                <Text fontSize="19pt" fontWeight={700}>
                  {modalState.view === "login" && "Login"}
                  {modalState.view === "signup" && "Sign Up"}
                  {modalState.view === "resetPassword" && "Reset Password"}
                </Text>

                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  width="95%"
                  mt="10px">
                  {modalState.view === "login" || modalState.view === "signup" ? (
                    <>
                      <OthersAuthButton />
                      <Text fontSize="12pt" color="gray.500" fontWeight={700}>OR</Text>
                      <AuthInputs />
                    </>
                  ) : (
                    <ResetPassword></ResetPassword>
                  )}

                </Flex>
              </ModalBody>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;