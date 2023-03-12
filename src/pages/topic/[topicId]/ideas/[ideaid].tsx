import { Idea } from '@/atoms/ideaAtom';
import PageContent from '@/components/Layout/PageContent';
import Comments from '@/components/Posts/Comments';
import IdeaItem from '@/components/Posts/IdeaItem';
import { auth } from '@/Firebase/clientApp';
import useIdeas from '@/hooks/useIdeas';
import axios from 'axios';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type IdeaPageProps = {

};

const IdeaPage: React.FC<IdeaPageProps> = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const { topicId, ideaid } = router.query;
    const { ideaStateValue, setIdeaStateValue, onVote } = useIdeas();
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (ideaid) {
    //         fetchIdea(ideaid);
    //     }
    //     //localStorage.setItem("selectedId", JSON.stringify(ideaStateValue.selectedIdea));
    // }, [])

    // const fetchIdea = async (idea_id: string | string[]) => {
    //     console.log("FETCHING IDEA");
    //     try {
    //         axios.get('http://localhost:8080/idea/' + idea_id).then(
    //             res => {
    //                 console.log("Idea fetched ==>", res.data)
    //                 setIdeaStateValue((prev) => ({
    //                     ...prev,
    //                     selectedIdeaDetails: res.data
    //                 }))
    //             }
    //         )

    //     } catch (error) {
    //         console.log("Idea fetched error ==>", error)
    //     }
    // }


    return (
        <PageContent>
            <>
                <IdeaItem
                    idea={ideaStateValue.Ideas[ideaStateValue.selectedIdeaIndex]}
                    index={ideaStateValue.selectedIdeaIndex}
                />
                <Comments
                    user={user}
                    topic={topicId}
                    selectedIdea={ideaStateValue.Ideas[ideaStateValue.selectedIdeaIndex]}
                //fetchIdea={fetchIdea}
                />
            </>
            <></>
        </PageContent >
    );
}
export default IdeaPage;