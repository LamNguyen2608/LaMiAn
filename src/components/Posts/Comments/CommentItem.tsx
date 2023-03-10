import React, { useCallback, useState } from "react";
import {
    Avatar,
    Box,
    Flex,
    Icon,
    Spinner,
    Stack,
    Text,
} from "@chakra-ui/react";
import moment from "moment";
import { FaReddit } from "react-icons/fa";
import {
    IoArrowDownCircleOutline,
    IoArrowUpCircleOutline,
} from "react-icons/io5";

export type Comment = {
    "id": number,
    "comment": string,
    "modify_date": string,
    "client": { id: string, firstname: string, lastname: string },
    "isAnonymous": boolean,
};

type CommentItemProps = {
    comment: Comment;
    // onDeleteComment: (comment: Comment) => void;
    // isLoading: boolean;
    userId?: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    // onDeleteComment,
    // isLoading,
    userId,
}) => {
    const [loading, setLoading] = useState(false);

    // const handleDelete = useCallback(async () => {
    //   setLoading(true);
    //   try {
    //     const success = await onDeleteComment(comment);

    //     if (!success) {
    //       throw new Error("Error deleting comment");
    //     }
    //   } catch (error: any) {
    //     console.log(error.message);
    //     // setError
    //     setLoading(false);
    //   }
    // }, [setLoading]);


    return (
        <Flex>
            <Box mr={2}>
                <Icon as={FaReddit} fontSize={30} color="gray.300" />
            </Box>
            <Stack spacing={1}>
                <Stack direction="row" align="center" spacing={2} fontSize="8pt">
                    <Text
                        fontWeight={700}
                        _hover={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                        {comment.isAnonymous ? "Anonymous" : comment.client.firstname + " " + comment.client.lastname}
                    </Text>
                    {comment.modify_date && (
                        <Text color="gray.600">
                            {moment(new Date(comment.modify_date)).fromNow()}
                        </Text>
                    )}
                    {/* {isLoading && <Spinner size="sm" />} */}
                </Stack>
                <Text fontSize="10pt">{comment.comment}</Text>
                <Stack
                    direction="row"
                    align="center"
                    cursor="pointer"
                    fontWeight={600}
                    color="gray.500"
                >
                    <Icon as={IoArrowUpCircleOutline} />
                    <Icon as={IoArrowDownCircleOutline} />
                    {userId === comment.client.id && (
                        <>
                            <Text
                                fontSize="9pt"
                                _hover={{ color: "brand.900" }}>
                                Edit
                            </Text>
                            <Text
                                fontSize="9pt"
                                _hover={{ color: "brand.900" }}
                                onClick={() => { }}
                            >
                                Delete
                            </Text>
                        </>
                    )}
                </Stack>
            </Stack>
        </Flex>
    );
};
export default CommentItem;