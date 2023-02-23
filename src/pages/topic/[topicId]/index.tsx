import React from 'react';
import { GetServerSidePropsContext } from 'next'
import safeJsonStringify from 'safe-json-stringify'
import { stringify } from 'querystring';
import axios from 'axios'
import Header from '@/components/Topic/Header';
import PageContent from '@/components/Layout/PageContent';
import IdeaItem from '@/components/Ideas/IdeaItem';
import { Topic } from '@/atoms/topicAtom';
import CreateIdeaLink from '@/components/Topic/CreateIdeaLink';


type TopicPageProps = {
    topicData: Topic;
};

const TopicPage: React.FC<TopicPageProps> = ({ topicData }) => {
    console.log(topicData);
    return (
        <>
            <Header topicData={topicData} />
            <PageContent>
                <>
                    <CreateIdeaLink />
                    {topicData.ideas.map((item) => {
                        <IdeaItem idea={item} />
                    })}
                </>
                <><div>RHS</div></>
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