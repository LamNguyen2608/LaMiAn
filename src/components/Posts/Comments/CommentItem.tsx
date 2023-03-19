import React, { useCallback, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Icon,
    Spinner,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import moment from "moment";
import { FaReddit } from "react-icons/fa";
import {
    IoArrowDownCircleOutline,
    IoArrowUpCircleOutline,
} from "react-icons/io5";
import update from "@/pages/topic/[topicId]/ideas/update";
import axios from "axios";
import useIdeas from "@/hooks/useIdeas";
import DeleteCommentModal from "@/components/Modal/DeleteComment";

export type Comment = {
    length: number;
    "id": number,
    "comment": string,
    "modify_date": string,
    "client": { id: string, firstname: string, lastname: string },
    "isAnonymous": boolean,
};

type CommentItemProps = {
    comment: Comment;
    setComments: (cmts: Comment[]) => void;
    comments: Comment[];
    userId?: string;
    index: number
};

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    userId,
    setComments,
    comments,
    index
}) => {
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteModal, showDeleteModal] = useState(false);
    const [editComment, setEditComment] = useState(comment.comment);
    let updateComment = JSON.parse(JSON.stringify(comments));
    const { onEditComment, onDeleteComment } = useIdeas();

    async function onUpdateComment() {
        setIsEdit(true);
        await onEditComment(comment, editComment, index);
        setIsEdit(false);
    }

    async function deleteComment() {
        updateComment.splice(index, 1);
        await onDeleteComment(comment, index);

    }

    function showModal() {
        showDeleteModal(false);
    }

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
                </Stack>
                {isEdit ? (
                    <><Textarea
                        value={editComment}
                        onChange={(event) => setEditComment(event.target.value)}
                        fontSize="10pt"
                        borderRadius={4}
                        minHeight="100px"
                        width="500px"
                        pb={10}
                        _placeholder={{ color: "gray.500" }}
                        _focus={{
                            outline: "none",
                            bg: "white",
                            border: "1px solid black",
                        }} />
                        <Flex direction="row" >
                            <Button
                                height="26px"
                                isDisabled={editComment.length === 0 ? true : false}
                                isLoading={loading}
                                onClick={() => onUpdateComment()}
                                right={0.1}
                            >
                                Edit
                            </Button>
                            <Button
                                height="26px"
                                isDisabled={editComment.length === 0 ? true : false}
                                isLoading={loading}
                                onClick={() => setIsEdit(false)}
                                right={0.1}
                            >
                                Cancel
                            </Button>
                        </Flex>
                    </>
                ) : (
                    <Text fontSize="10pt">{comment.comment}</Text>
                )}
                <Stack
                    direction="row"
                    align="center"
                    cursor="pointer"
                    fontWeight={600}
                    color="gray.500"
                >
                    <Icon as={IoArrowUpCircleOutline} />
                    <Icon as={IoArrowDownCircleOutline} />
                    {userId === comment.client.id && isEdit == false && (
                        <>
                            <Text
                                fontSize="9pt"
                                _hover={{ color: "brand.900" }}
                                onClick={() => setIsEdit(true)}>
                                Edit
                            </Text>
                            <Text
                                fontSize="9pt"
                                _hover={{ color: "brand.900" }}
                                onClick={() => { showDeleteModal(true) }}
                            >
                                Delete
                            </Text>
                        </>
                    )}
                </Stack>
            </Stack>
            <DeleteCommentModal showModal={deleteModal} hideModal={showModal} confirmModal={deleteComment} />
        </Flex>
    );
};
export default CommentItem;