import PageContent from '@/components/Layout/PageContent';
import IdeaItem from '@/components/Posts/IdeaItem';
import { auth } from '@/Firebase/clientApp';
import useIdeas from '@/hooks/useIdeas';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type IdeaPageProps = {

};

const IdeaPage: React.FC<IdeaPageProps> = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const { topicid, ideaid } = router.query;
    //const { communityStateValue } = useCommunityData();
    const { ideaStateValue, setIdeaStateValue, onVote } = useIdeas();
    const [idea, setIdea] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchIdea();
    }, [ideaid])

    const fetchIdea = async () => {
        console.log("FETCHING IDEA");
        try {
            axios.get('http://localhost:8080/idea/' + ideaid).then(
                res => {
                    console.log("Idea fetched ==>", res.data)
                    setIdea(res.data);
                }
            )

        } catch (error) {
            console.log("Idea fetched error ==>", error)
        }
    }

    return (
        <PageContent>
            <>
                <IdeaItem
                    idea={ideaStateValue.selectedIdea}
                />
            </>
            <></>
        </PageContent >
    );
}
export default IdeaPage;