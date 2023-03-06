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


const useIdeas = () => {
    const [ideaStateValue, setIdeaStateValue] = useRecoilState(ideaState);
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

        try {
            if (existingVoteIndex === -1) {
                updatedIdeaVotes = [...updatedIdeaVotes, newReaction]
                axios.post('http://localhost:8080/idea/reaction', {
                    "reaction": newReaction.reaction,
                    "client_id": user.uid,
                    "idea_id": idea.id
                }).then(res => {
                    console.log("NEW VOTE!!!", res.data, newReaction);
                    updatedIdeas[existingIdeaIndex].reactions.push(res.data);
                    setIdeaStateValue((prev) => ({
                        ...prev,
                        IdeaVotes: updatedIdeaVotes,
                        Ideas: updatedIdeas
                    }))
                })
            } else {
                console.log("Update VOTE!!! ==>", newReaction);
                //post here
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

    const onSelectIdea = async () => {

    }

    const onDeleteIdea = async () => {

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
    useEffect(() => {
        if (!user) return;
        getMyReactions();
    }, [user])
    return {
        ideaStateValue,
        setIdeaStateValue,
        onVote
    }
}
export default useIdeas;