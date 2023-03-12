import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next'
import safeJsonStringify from 'safe-json-stringify'
import { stringify } from 'querystring';
import axios from 'axios'
import Header from '@/components/Topic/Header';
import PageContent from '@/components/Layout/PageContent';
import { Topic } from '@/atoms/topicAtom';
import CreatePostForm from '@/components/Posts/CreatePostForm';
import TopicRHS from '@/components/Topic/TopicRHS';
import IdeaItem from '@/components/Posts/IdeaItem';
import useIdeas from '@/hooks/useIdeas';
import { ideaState } from '@/atoms/ideaAtom';
import About from '@/components/Topic/About';

type TopicPageProps = {
    topicData: Topic;
};

const TopicPage: React.FC<TopicPageProps> = ({ topicData }) => {
    console.log("===>", topicData.ideas);
    const { ideaStateValue, setIdeaStateValue } = useIdeas();
    useEffect(() => {
        setIdeaStateValue((prev) => ({
            ...prev,
            Ideas: topicData.ideas
        }))
    }, [])
    return (
        <>
            <Header topicData={topicData} />
            <PageContent>
                <>
                    {new Date(topicData.topic_closure_date).getTime() > new Date().getTime()
                        ? (<CreatePostForm />) : null}
                    {ideaStateValue.Ideas.map((item, index) => (
                        <IdeaItem idea={item} index={index} />
                    ))}
                </>
                <><About topicData={topicData} /></>
            </PageContent>
        </>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + 'topic/' + context.query.topicId as string);
        console.log(response.data);
        return {
            props: {
                topicData: JSON.parse(safeJsonStringify({ ...response.data }))
            }
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}
export default TopicPage;