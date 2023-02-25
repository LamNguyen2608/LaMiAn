import { Idea } from '@/atoms/ideaAtom';
import useIdeas from '@/hooks/useIdeas';
import React, { useEffect } from 'react';
import IdeaItem from './IdeaItem';

type IdeasProps = {
    ideas: Idea[]
};

const Ideas: React.FC<IdeasProps> = ({ ideas }) => {
    //useAuthState
    const { ideaStateValue, setIdeaStateValue } = useIdeas();
    useEffect(() => {
        setIdeaStateValue(prev => ({
            ...prev,
            Ideas: ideas
        }))
    }, [])
    const getIdeas = async () => {

    }
    useEffect(() => {
        getIdeas();
    }, [])
    return (
        <>
            {ideas.map((item) => {
                <IdeaItem idea={item} />
            })}
        </>
    )
}
export default Ideas;