import React from 'react';
import { GetServerSidePropsContext } from 'next'
import safeJsonStringify from 'safe-json-stringify'
import { stringify } from 'querystring';
import axios from 'axios'
import Header from '@/components/Topic/Header';
import PageContent from '@/components/Layout/PageContent';
import IdeaItem from '@/components/Ideas/IdeaItem';
type Topic = {

}
type TopicPageProps = {
    topicData: any;
};

const TopicPage: React.FC<TopicPageProps> = ({ topicData }) => {
    console.log(topicData);
    return (
        <>
            <Header topicData={topicData.data} />
            <div>Topic Page:  {topicData.data[3].name}</div>
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
        const response = await axios.get('https://user-api-rfbg.onrender.com/customer/');
        console.log(response);
        return {
            props: {
                topicData: JSON.parse(safeJsonStringify({ ...response }))
            }
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                topicData: error
            }
        }
    }
}
export default TopicPage;