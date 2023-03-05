import { Topic, TopicSnippet, TopicState } from '@/atoms/topicAtom';
import { auth } from '@/Firebase/clientApp';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';


const useTopics = () => {
    const [user] = useAuthState(auth);
    const [topicStateValue, setTopicStateValue] = useRecoilState(TopicState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onFollowOrUnfollowTopic = (topicData: Topic, isFollowed: boolean) => {
        if (isFollowed) {
            unfollowTopic(topicData.id);
            return;
        }
        followTopic(topicData);
    };
    const followTopic = (topicData: Topic) => {

    };

    const unfollowTopic = (topicId: number) => {

    };

    const getFollowedTopics = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/client/topic/' + user?.uid)
            setTopicStateValue((prev) => ({
                ...prev,
                followedTopics: response.data
            }))
            setLoading(false);
        } catch (error) {
            console.log("Get followed topic: ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user) return;
        getFollowedTopics();
    }, [user])
    return {
        topicStateValue,
        onFollowOrUnfollowTopic
    }
}
export default useTopics;