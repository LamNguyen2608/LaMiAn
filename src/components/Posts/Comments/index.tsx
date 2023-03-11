import React, { useCallback, useEffect, useState } from "react";
import {
    Box,
    Flex,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import CommentItem, { Comment } from "./CommentItem";
import CommentInput from "./Input";
import { User } from "firebase/auth";
import { IdeaDetails } from "@/atoms/ideaAtom";
import axios from "axios";

type CommentsProps = {
    user?: User | null;
    selectedIdea: IdeaDetails;
    topic: string;
    fetchIdea: (idea_id: string) => void
};

const Comments: React.FC<CommentsProps> = ({
    user,
    selectedIdea,
    topic,
    fetchIdea
}) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<Comment[] | null>([]);
    const [commentFetchLoading, setCommentFetchLoading] = useState(false);
    const [commentCreateLoading, setCommentCreateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState("");
    const setAuthModalState = useSetRecoilState(authModalState);

    const onCreateComment = async (comment: string) => {
        if (!user) {
            setAuthModalState({ open: true, view: "login" });
            return;
        }

        setCommentCreateLoading(true);
        try {

            axios.post('http://localhost:8080/idea/comment', {
                "comment": comment,
                "client_id": user.uid,
                "idea_id": selectedIdea.id
            }).then(async res => {
                setComment("");
                setCommentCreateLoading(false);
                await fetchIdea(selectedIdea.id.toString());
            })
        } catch (error) {

        };
    }


    useEffect(() => {
        //console.log("HERE IS SELECTED POST", selectedPost.id);
        // getPostComments();
        if (selectedIdea) {
            setComments(selectedIdea.comments)
        }
    }, [selectedIdea]);

    return (
        <Box bg="white" p={2} borderRadius="0px 0px 4px 4px">
            <Flex
                direction="column"
                pl={10}
                pr={4}
                mb={6}
                fontSize="10pt"
                width="100%"
            >
                {/* Add validation to hide comment input section */}
                <CommentInput
                    comment={comment}
                    setComment={setComment}
                    loading={commentCreateLoading}
                    user={user}
                    onCreateComment={onCreateComment}
                />
            </Flex>
            <Stack spacing={6} p={2}>
                {commentFetchLoading ? (
                    <>
                        {[0, 1, 2].map((item) => (
                            <Box key={item} padding="6" bg="white">
                                <SkeletonCircle size="10" />
                                <SkeletonText mt="4" noOfLines={2} spacing="4" />
                            </Box>
                        ))}
                    </>
                ) : (
                    <>
                        {!!comments.length ? (
                            <>
                                {comments.map((item: Comment) => (
                                    <CommentItem
                                        key={item.id}
                                        comment={item}
                                        //onDeleteComment={onDeleteComment}
                                        //isLoading={deleteLoading === (item.id as string)}
                                        userId={user?.uid}
                                    />
                                ))}
                            </>
                        ) : (
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                borderTop="1px solid"
                                borderColor="gray.100"
                                p={20}
                            >
                                <Text fontWeight={700} opacity={0.3}>
                                    No Comments Yet
                                </Text>
                            </Flex>
                        )}
                    </>
                )}
            </Stack>
        </Box>
    );
};
export default Comments;