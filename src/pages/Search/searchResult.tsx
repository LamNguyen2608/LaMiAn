import { useEffect, useState } from 'react';
import { Flex, Heading, Icon, Stack } from '@chakra-ui/react';
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
import PageContentLayout from '../../components/Layout/PageContent';
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
import SearchItems from './SearchItems';
import TextInput from '@/components/Posts/PostForm/TextInput';
import { AiFillFileText } from 'react-icons/ai';
import { BsFillFileImageFill } from 'react-icons/bs';
import { RiFileTextLine, RiPagesFill } from 'react-icons/ri';
import TopicItem from '@/components/Topic/TopicItem';
// import PostLoader from "../components/Post/Loader";
// import PostItem from "../components/Post/PostItem";
// import { auth, firestore } from "../firebase/clientApp";
// import usePosts from "../hooks/usePosts";
// import Premium from "../components/Community/Premium";
// import PersonalHome from "../components/Community/PersonalHome";

type SearchInputProps = {
  SearchData: Idea[];
};
const formTabs: SearchItem[] = [
  {
    title: 'Ideas',
    icon: RiFileTextLine,
  },
  {
    title: 'Topic',
    icon: RiPagesFill,
  },
];
export type SearchItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const searchResult: React.FC<SearchInputProps> = ({ SearchData }) => {
  const [selectTab, setSelectTab] = useState(formTabs[0].title);
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
              {selectTab === 'Ideas' && (
                <>
                  <Heading
                    bgGradient="linear(to-l, brand.100, brand.200)"
                    bgClip="text"
                  >
                    Searched Ideas
                  </Heading>
                  <>
                    {currentSearch.idea.length != 0 &&
                    currentSearch.currentSearch.length > 0 ? (
                      <>
                        {currentSearch.idea.map((idea: Idea, index) => (
                          <IdeaItem idea={idea} index={index} />
                        ))}
                      </>
                    ) : (
                      <>no result</>
                    )}
                  </>
                </>
              )}
              {selectTab === 'Topic' && (
                <>
                  <Heading
                    bgGradient="linear(to-l, brand.100, brand.200)"
                    bgClip="text"
                  >
                    Searched Topics
                  </Heading>
                  <>
                    {currentSearch.topic.length != 0 &&
                    currentSearch.currentSearch.length ? (
                      <>
                        {currentSearch.topic.map((topic: Topic, index) => (
                          <TopicItem topic={topic} index={index} />
                        ))}
                      </>
                    ) : (
                      <>no result</>
                    )}
                  </>
                </>
              )}
            </>
          </Stack>
        </>
        <Stack spacing={5} position="sticky" top="14px">
          <Flex
            direction="column"
            bg="white"
            borderRadius={4}
            cursor="pointer"
            border="1px solid"
            borderColor="gray.300"
          >
            <Flex
              align="flex-end"
              color="white"
              p="6px 10px"
              bg="blue.500"
              height="70px"
              borderRadius="4px 4px 0px 0px"
              fontWeight={600}
              bgImage="url(/images/recCommsArt.png)"
              backgroundSize="cover"
              bgGradient="linear-gradient(to bottom, brand.100, brand.200 )"
            >
              Search Selection
            </Flex>
            {formTabs.map((item) => (
              <SearchItems
                key={item.title}
                item={item}
                selected={item.title === selectTab}
                setSelectedTab={setSelectTab}
              />
            ))}
          </Flex>
        </Stack>
      </PageContentLayout>
    </>
  );
};

export default searchResult;
