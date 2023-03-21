import { useEffect, useState } from 'react';
import { Heading, Stack } from '@chakra-ui/react';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
// import { communityState } from "../atoms/communitiesAtom";
// import { Post, PostVote } from "../atoms/postsAtom";
// import CreatePostLink from "../components/Community/CreatePostLink";
// import Recommendations from "../components/Community/Recommendations";
import PageContentLayout from '../components/Layout/PageContent';
import { auth, firestore } from '@/Firebase/clientApp';
import Recommendations from '@/components/Topic/Recommendations';
import axios from 'axios';
import { Idea, ideaState } from '@/atoms/ideaAtom';
import IdeaItem from '@/components/Posts/IdeaItem';
import FollowTopics from '@/components/Topic/FollowedTopics';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';
// import PostLoader from "../components/Post/Loader";
// import PostItem from "../components/Post/PostItem";
// import { auth, firestore } from "../firebase/clientApp";
// import usePosts from "../hooks/usePosts";
// import Premium from "../components/Community/Premium";
// import PersonalHome from "../components/Community/PersonalHome";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [ideaStateValue, setIdeaStateValue] = useRecoilState(ideaState);
  // const {
  //   postStateValue,
  //   setPostStateValue,
  //   onVote,
  //   onSelectPost,
  //   onDeletePost,
  //   loading,
  //   setLoading,
  // } = usePosts();
  // const communityStateValue = useRecoilValue(communityState);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  console.log('Loading items from ${itemOffset} to ${endOffset}');
  // const currentItems = ideaStateValue.Ideas.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(ideaStateValue.Ideas.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % ideaStateValue.Ideas.length;
    console.log(
      'User requested page number ${event.selected}, which is offset ${newOffset}'
    );
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };
  const getTrendingPosts = async () => {
    setLoading(true);
    console.log('Trending Post');
    try {
      axios.get('http://localhost:8080/idea').then((res) => {
        console.log('Get trending ideas', res);
        setIdeaStateValue((prev) => ({
          ...prev,
          Ideas: res.data,
        }));
      });
    } catch (error) {
      console.log('Get trending ideas error', error);
    }
    setLoading(false);
  };

  const getNoUserHomePosts = async () => {
    console.log('GETTING NO USER FEED');
    //setLoading(true);
    //setLoading(false);
  };

  const getUserPostVotes = async () => {};

  useEffect(() => {
    getTrendingPosts();
  }, []);


  return (
    <PageContentLayout>
      <>
        <Stack>
          <Heading
            bgGradient="linear(to-l, brand.100, brand.200)"
            bgClip="text"
          >
            Top Trend Ideas
          </Heading>
          {ideaStateValue.Ideas.slice(itemOffset, endOffset).map(
            (idea: Idea, index) => (
              <IdeaItem idea={idea} index={index} />
            )
          )}
        </Stack>
        <Stack
          width="70%"
          justify="space-evenly"
          alignSelf="center"
          display="flex"
          mt={8}
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
      <Stack spacing={5} position="sticky" top="14px">
        <Recommendations />
        <FollowTopics />
      </Stack>
    </PageContentLayout>
  );
};

export default Home;