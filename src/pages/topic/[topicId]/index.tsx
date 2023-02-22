import React from 'react';
import { GetServerSidePropsContext } from 'next'
import safeJsonStringify from 'safe-json-stringify'
import { stringify } from 'querystring';
import axios from 'axios'
import Header from '@/components/Topic/Header';
import PageContent from '@/components/Layout/PageContent';
import IdeaItem from '@/components/Ideas/IdeaItem';
type Idea = {
    "id": number,
    "name": string,
    "body": string,
    "date": string,
    "modify_date": string,
    "attached_path": string,
    "reactions": any[],
    "category": any[]
}
type Topic = {
    "id": number,
    "name": string,
    "idea_closure_date": string,
    "final_closure_date": string,
    "modifyDate": string,
    "isDeleted": boolean,
    "ideas": Idea[]
}

type TopicPageProps = {
    topicData: Topic;
};

const TopicPage: React.FC<TopicPageProps> = ({ topicData }) => {
    console.log(topicData);
    return (
        <>
            <Header topicData={topicData} />
            <div>Topic Page:  {topicData.name}</div>
            <PageContent>
                <><IdeaItem></IdeaItem></>
                <><div>RHS</div></>
            </PageContent>
        </>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    //get topic data and pass it to cline
    //context.query.topicId as string => getting id from route
    try {
        const response = await axios.get('http://localhost:8080/topic/' + context.query.topicId as string);
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