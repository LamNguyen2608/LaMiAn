import React, { MouseEventHandler, useState, useEffect } from "react";
import { Flex, Textarea, Button, Text, Checkbox } from "@chakra-ui/react";
import { User } from "firebase/auth";
import AuthButtons from "../../Navbar/RightContent/AuthButtons";
import { clientState } from "@/atoms/clientAtom";
import { useRecoilState } from "recoil";

type CommentInputProps = {
    comment: string;
    setComment: (value: string) => void;
    loading: boolean;
    user?: User | null;
    onCreateComment: (comment: string) => void;
    isAnonymous: boolean;
    setAnonymous: () => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
    comment,
    setComment,
    loading,
    user,
    onCreateComment,
    isAnonymous,
    setAnonymous
}) => {
    const [clientStateValue, setClientStateValue] = useRecoilState(clientState);
    useEffect(() => {
        if (!clientStateValue.currentClient) {
            setClientStateValue({ currentClient: JSON.parse(localStorage.getItem("currentClient")) })
        }
    }, [])
    return (
        <Flex direction="column" position="relative">
            {user ? (
                <>
                    <Text mb={1}>
                        Comment as{" "}
                        <span style={{ color: "#3182CE", marginRight: 1 }}>
                            {clientStateValue.currentClient?.firstname + " " + clientStateValue.currentClient?.lastname}
                        </span>
                        {" "} {" "} or {" "} {" "}
                        <Checkbox
                            marginTop={0.5}
                            marginLeft={1}
                            marginRight={1}
                            isChecked={isAnonymous}
                            onChange={() => setAnonymous()}></Checkbox>
                        <span style={{ color: "#3182CE" }}>
                            {" "} Go anonymous
                        </span>
                    </Text>

                    <Textarea
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        placeholder="What are your thoughts?"
                        fontSize="10pt"
                        borderRadius={4}
                        minHeight="100px"
                        pb={10}
                        _placeholder={{ color: "gray.500" }}
                        _focus={{
                            outline: "none",
                            bg: "white",
                            border: "1px solid black",
                        }}
                    />
                    <Flex
                        position="absolute"
                        left="1px"
                        right={0.1}
                        bottom="1px"
                        justify="flex-end"
                        bg="gray.100"
                        p="6px 8px"
                        borderRadius="0px 0px 4px 4px"
                    >
                        <Button
                            height="26px"
                            isDisabled={comment.length === 0 ? true : false}
                            isLoading={loading}
                            onClick={() => onCreateComment(comment)}
                        >
                            Comment
                        </Button>
                    </Flex>
                </>
            ) : (
                <Flex
                    align="center"
                    justify="space-between"
                    borderRadius={2}
                    border="1px solid"
                    borderColor="gray.100"
                    p={4}
                >
                    <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
                    <AuthButtons />
                </Flex>
            )}
        </Flex>
    );
};
export default CommentInput;

