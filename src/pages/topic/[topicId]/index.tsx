import React, { useEffect } from 'react';
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

type TopicPageProps = {
    topicData: Topic;
};

const TopicPage: React.FC<TopicPageProps> = ({ topicData }) => {
    console.log("===>", topicData.ideas);
    return (
        <>
            <Header topicData={topicData} />
            <PageContent>
                <>
                    <CreatePostForm />
                    {topicData.ideas.map((item) => (
                        <IdeaItem idea={item} />
                    ))}
                </>
                <><TopicRHS topicData={topicData} /></>
            </PageContent>
        </>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    //get topic data and pass it to cline
    //context.query.topicId as string => getting id from route
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