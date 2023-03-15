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
import type { GetServerSidePropsContext, NextPage } from 'next';
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
import SearchInput from '@/components/Navbar/Search/SearchInput';
import safeJsonStringify from 'safe-json-stringify';
import { Topic } from '@/atoms/topicAtom';
import { searchState } from '@/atoms/searchAtom';
// import PostLoader from "../components/Post/Loader";
// import PostItem from "../components/Post/PostItem";
// import { auth, firestore } from "../firebase/clientApp";
// import usePosts from "../hooks/usePosts";
// import Premium from "../components/Community/Premium";
// import PersonalHome from "../components/Community/PersonalHome";

type SearchInputProps = {
  SearchData: Idea[];
};

const searchResult: React.FC<SearchInputProps> = ({ SearchData }) => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [ideaStateValue, setIdeaStateValue] = useState<Idea[]>([]);
  const currentSearch = useRecoilValue(searchState);

  // const getTrendingPosts = async () => {
  //   setLoading(true)
  //   console.log("Search Post");
  //   try {
  //     axios.get('http://localhost:8080/idea').then(res => {
  //       console.log("Get trending ideas", res);
  //       setIdeaStateValue((prev) => ({
  //         ...prev,
  //         Ideas: res.data
  //       }));
  //     })
  //   } catch (error) {
  //     console.log("Get trending ideas error", error);
  //   }
  //   setLoading(false);
  // };

  // const getNoUserHomePosts = async () => {
  //   console.log("GETTING NO USER FEED");
  //   //setLoading(true);
  //   //setLoading(false);
  // };

  const getUserPostVotes = async () => {};

  useEffect(() => {
    setIdeaStateValue(SearchData);
  }, []);

  return (
    <>
      <PageContentLayout>
        <>
          <Stack>
            <>
              <Heading
                bgGradient="linear(to-l, brand.100, brand.200)"
                bgClip="text"
              >
                Searched Ideas
              </Heading>
              {currentSearch.idea.length != 0 ? (
                <>
                  {currentSearch.idea.map((idea: Idea, index) => (
                    <IdeaItem idea={idea} index={index} />
                  ))}
                </>
              ) : (
                <>no result</>
              )}
            </>
          </Stack>
        </>
        <Stack spacing={5} position="sticky" top="14px">
          <Recommendations />
          <FollowTopics />
        </Stack>
      </PageContentLayout>
    </>
  );
};

export default searchResult;
