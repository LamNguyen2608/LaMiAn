import { ideaState } from '@/atoms/ideaAtom';
import React from 'react';
import { useRecoilState } from 'recoil';


const useIdeas = () => {
    const [ideaStateValue, setIdeaStateValue] = useRecoilState(ideaState)

    const onVote = async () => {

    }

    const onSelectIdea = async () => {

    }

    const onDeleteIdea = async () => {

    }
    return {
        ideaStateValue,
        setIdeaStateValue
    }
}
export default useIdeas;