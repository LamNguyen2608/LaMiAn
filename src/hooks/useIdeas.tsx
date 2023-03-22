import { Idea, ideaState, myVote } from '@/atoms/ideaAtom';
import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import { Topic, TopicSnippet, TopicState } from "../atoms/topicAtom";
// import { Post, postState, PostVote } from "../atoms/postsAtom";
import { auth } from "@/Firebase/clientApp";
import { useRouter } from "next/router";
import axios from 'axios';
import Ideas from '@/components/Posts/Ideas';
import { Comment } from '@/components/Posts/Comments/CommentItem';


const useIdeas = () => {
    const [ideaStateValue, setIdeaStateValue] = useRecoilState(ideaState);
    const [updateIdea, setUpdateIdea] = useState<Idea>()
    const [user, loadingUser] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const topicStateValue = useRecoilValue(TopicState);

    const onVote = async (
        event: React.MouseEvent<SVGElement, MouseEvent>,
        idea: Idea,
        newReaction: myVote) => {

        event.stopPropagation();
        if (!user?.uid) {
            setAuthModalState({ open: true, view: "login" });
            return;
        }

        const existingVoteIndex: number = ideaStateValue.IdeaVotes.findIndex(
            (vote) => vote.idea_id === idea.id
        );

        let updatedIdeaVotes = JSON.parse(JSON.stringify(ideaStateValue.IdeaVotes));
        let updatedIdeas = JSON.parse(JSON.stringify(ideaStateValue.Ideas));
        const existingIdeaIndex: number = ideaStateValue.Ideas.findIndex(
            (item) => item.id === idea.id
        )
        console.log("The idea that changes vote ====>", existingIdeaIndex);

        try {
            if (existingVoteIndex === -1) {
                updatedIdeaVotes = [...updatedIdeaVotes, newReaction]
                axios.post('http://localhost:8080/idea/reaction', {
                    "reaction": newReaction.reaction,
                    "client_id": user.uid,
                    "idea_id": idea.id
                }).then(res => {
                    console.log("NEW VOTE!!!", res.data, newReaction);
                    updatedIdeas[existingIdeaIndex].reactions = [...updatedIdeas[existingIdeaIndex].reactions, res.data];
                    setIdeaStateValue((prev) => ({
                        ...prev,
                        IdeaVotes: updatedIdeaVotes,
                        Ideas: updatedIdeas
                    }))
                })
            } else {
                console.log("Update VOTE!!! ==>", newReaction);

                axios.put('http://localhost:8080/idea/reaction/update', {
                    "reaction": newReaction.reaction,
                    "client_id": user.uid,
                    "idea_id": idea.id
                }).then(res => {
                    console.log("UPDATE VOTE RESULT!!!", res.data);
                    updatedIdeaVotes[existingVoteIndex] = newReaction;
                    let existingReactionIndex: number = updatedIdeas[existingIdeaIndex].reactions.findIndex(
                        (reaction: { id: number; }) => reaction.id === newReaction.reaction_id
                    )
                    updatedIdeas[existingIdeaIndex].reactions[existingReactionIndex].reaction = newReaction.reaction;
                    setIdeaStateValue((prev) => ({
                        ...prev,
                        IdeaVotes: updatedIdeaVotes,
                        Ideas: updatedIdeas
                    }))
                })

            }

        } catch (error) {

        }

    }


    const onDeleteIdea = async (index: number, topicId: string) => {
        let deletedIdea = [...ideaStateValue.Ideas];
        try {
            axios.delete('http://localhost:8080/idea/delete/' + deletedIdea.splice(index, 1)[0].id).then(res => {
                setIdeaStateValue((prev) => ({
                    ...prev,
                    Ideas: deletedIdea
                }))
                router.push('/topic/' + topicId);
            })
        } catch (error) {
            console.log("Delete Idea Error =>", error);
        }

    }

    const getMyReactions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/client/reaction/' + user?.uid)
            setIdeaStateValue((prev) => ({
                ...prev,
                IdeaVotes: response.data
            }))
            setLoading(false);
        } catch (error) {
            console.log("Get all reactions by user: ", error);
            setLoading(false);
        }
    }

    async function onEditComment(comment: Comment, editComment: string, index: number) {
        let updateComment = JSON.parse(JSON.stringify(ideaStateValue.Ideas));

        axios.put('http://localhost:8080/idea/comment/update', {
            id: comment.id,
            comment: editComment,
            isAnonymous: comment.isAnonymous
        })
            .then(res => {
                updateComment[ideaStateValue.selectedIdeaIndex].comments[index] = res.data;
                setIdeaStateValue((prev) => ({
                    ...prev,
                    Ideas: updateComment
                }))
            })
    }

    async function onDeleteComment(comment: Comment, index: number) {
        let updateComment = JSON.parse(JSON.stringify(ideaStateValue.Ideas));

        axios.delete('http://localhost:8080/idea/comment/delete/' + comment.id)
            .then(res => {
                updateComment[ideaStateValue.selectedIdeaIndex].comments.splice(index, 1);
                setIdeaStateValue((prev) => ({
                    ...prev,
                    Ideas: updateComment
                }));
            })
    }

    useEffect(() => {
        if (!user) return;
        getMyReactions();
    }, [user])
    return {
        ideaStateValue,
        setIdeaStateValue,
        setUpdateIdea,
        updateIdea,
        onDeleteIdea,
        onEditComment,
        onDeleteComment,
        onVote
    }
}
export default useIdeas;