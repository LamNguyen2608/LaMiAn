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

    const onFollowOrUnfollowTopic = (topicId: number, isFollowed: boolean) => {
        if (isFollowed) {
            unfollowTopic(topicId);
            return;
        }
        followTopic(topicId);
    };
    const followTopic = (topicId: number) => {
        axios.post('https://backend-2tza.onrender.com/client/topic', {
            client_id: user?.uid,
            topic_id: topicId
        }).then(res => {
            if (res.status === 200) {
                console.log("successfully followed topic");
                getFollowedTopics();
            }
        })
    };

    const unfollowTopic = (topicId: number) => {
        axios.delete('https://backend-2tza.onrender.com/client/topic/delete', {
            data: {
                "topic_id": topicId,
                "client_id": user?.uid
            }
        }).then(res => {
            if (res.status === 200) {
                console.log("successfully unfollowed topic")
                getFollowedTopics();
            }
        })
    };

    const getFollowedTopics = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://backend-2tza.onrender.com/client/topic/' + user?.uid)
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
        onFollowOrUnfollowTopic,
        setTopicStateValue
    }
}
export default useTopics;