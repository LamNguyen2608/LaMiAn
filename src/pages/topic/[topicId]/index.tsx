import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import { stringify } from 'querystring';
import axios from 'axios';
import Header from '@/components/Topic/Header';
import PageContent from '@/components/Layout/PageContent';
import { Topic } from '@/atoms/topicAtom';
import CreatePostForm from '@/components/Posts/CreatePostForm';
import TopicRHS from '@/components/Topic/TopicRHS';
import IdeaItem from '@/components/Posts/IdeaItem';
import useIdeas from '@/hooks/useIdeas';
import { ideaState } from '@/atoms/ideaAtom';
import About from '@/components/Topic/About';
import useTopics from '@/hooks/useTopics';
import ReactPaginate from 'react-paginate';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';

type TopicPageProps = {
  topicData: Topic;
};

const TopicPage: React.FC<TopicPageProps> = ({ topicData }) => {
  const { topicStateValue, setTopicStateValue } = useTopics();
  const [topIdeas, setTopIdeas] = useState<any[]>([]);
  console.log('===>', topicData.ideas);
  const { ideaStateValue, setIdeaStateValue } = useIdeas();
  useEffect(() => {
    setIdeaStateValue((prev) => ({
      ...prev,
      Ideas: topicData.ideas,
    }));
    setTopicStateValue((prev) => ({
      ...prev,
      currentTopic: topicData,
    }));
    const reactionCounts = ideaStateValue.Ideas.map((idea) => ({
      id: idea.id,
      count: idea.reactions.length,
    }));
    console.log('reactionCounts', reactionCounts);
    const maxCount = Math.max(...reactionCounts.map((item) => item.count), 0);
    console.log('maxCount', maxCount);
    const filteredCounts = reactionCounts.filter(
      (item) => item.count === maxCount
    );
    console.log('filterCounts', filteredCounts);
    setTopIdeas(filteredCounts);
  }, []);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(ideaStateValue.Ideas.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % ideaStateValue.Ideas.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header topicData={topicData} />
      <PageContent>
        <>
          {new Date(topicData.topic_closure_date).getTime() >
          new Date().getTime() ? (
            <CreatePostForm />
          ) : null}
          <Heading
            bgGradient="linear(to-l, brand.100, brand.200)"
            bgClip="text"
          >
            Most Popular Ideas
          </Heading>
          {topIdeas.length > 0 &&
            topIdeas.map((idea) => {
              let index = ideaStateValue.Ideas.findIndex(
                (item) => item.id === idea.id
              );
              console.log('index top ideas', idea);
              return (
                <IdeaItem idea={ideaStateValue.Ideas[index]} index={index} />
              );
            })}
          <Heading
            bgGradient="linear(to-l, brand.100, brand.200)"
            bgClip="text"
          >
            Recent Ideas
          </Heading>
          {ideaStateValue.Ideas.slice(itemOffset, endOffset).map(
            (item, index) => (
              <IdeaItem idea={item} index={index} />
            )
          )}
          <Stack
            width="70%"
            justify="space-evenly"
            alignSelf="center"
            display="flex"
          >
            <ReactPaginate
              activeClassName={'item active '}
              breakClassName={'item break-me '}
              breakLabel={'...'}
              containerClassName={'pagination'}
              disabledClassName={'disabled-page'}
              nextClassName={'item next '}
              nextLabel={
                <ArrowForwardIcon style={{ fontSize: 18, width: 150 }} />
              }
              pageClassName={'item pagination-page '}
              previousClassName={'item previous'}
              previousLabel={
                <ArrowBackIcon style={{ fontSize: 18, width: 150 }} />
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
            />
          </Stack>
        </>
        <>
          <About topicData={topicData} />
        </>
      </PageContent>
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const response = await axios.get(
      (process.env.REACT_APP_BACKEND_ENDPOINT +
        'topic/' +
        context.query.topicId) as string
    );
    console.log(response.data);
    return {
      props: {
        topicData: JSON.parse(safeJsonStringify({ ...response.data })),
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default TopicPage;
