import { useEffect, useState } from "react";
import { Heading, Stack } from "@chakra-ui/react";
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
} from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";
// import { communityState } from "../atoms/communitiesAtom";
// import { Post, PostVote } from "../atoms/postsAtom";
// import CreatePostLink from "../components/Community/CreatePostLink";
// import Recommendations from "../components/Community/Recommendations";
import PageContentLayout from "../components/Layout/PageContent";
import { auth, firestore } from "@/Firebase/clientApp";
import Recommendations from "@/components/Topic/Recommendations";
import axios from "axios";
import { Idea, ideaState } from "@/atoms/ideaAtom";
import IdeaItem from "@/components/Posts/IdeaItem";
import FollowTopics from "@/components/Topic/FollowedTopics";
// import PostLoader from "../components/Post/Loader";
// import PostItem from "../components/Post/PostItem";
// import { auth, firestore } from "../firebase/clientApp";
// import usePosts from "../hooks/usePosts";
// import Premium from "../components/Community/Premium";
// import PersonalHome from "../components/Community/PersonalHome";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false)
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

  const getTrendingPosts = async () => {
    setLoading(true)
    console.log("Trending Post");
    try {
      axios.get('http://localhost:8080/idea').then(res => {
        console.log("Get trending ideas", res);
        setIdeaStateValue((prev) => ({
          ...prev,
          Ideas: res.data
        }));
      })
    } catch (error) {
      console.log("Get trending ideas error", error);
    }
    setLoading(false);
  };

  const getNoUserHomePosts = async () => {
    console.log("GETTING NO USER FEED");
    //setLoading(true);
    //setLoading(false);
  };

  const getUserPostVotes = async () => {

  };

  useEffect(() => {
    getTrendingPosts();
  }, [])

  // useEffect(() => {
  //   /**
  //    * initSnippetsFetched ensures that user snippets have been retrieved;
  //    * the value is set to true when snippets are first retrieved inside
  //    * of getSnippets in useCommunityData
  //    */
  //   if (!communityStateValue.initSnippetsFetched) return;

  //   if (user) {
  //     getUserHomePosts();
  //   }
  // }, [user, communityStateValue.initSnippetsFetched]);

  // useEffect(() => {
  //   if (!user && !loadingUser) {
  //     getNoUserHomePosts();
  //   }
  // }, [user, loadingUser]);

  // useEffect(() => {
  //   if (!user?.uid || !postStateValue.posts.length) return;
  //   getUserPostVotes();

  //   // Clear postVotes on dismount
  //   return () => {
  //     setPostStateValue((prev) => ({
  //       ...prev,
  //       postVotes: [],
  //     }));
  //   };
  // }, [postStateValue.posts, user?.uid]);

  return (
    <PageContentLayout>
      <>
        <Stack>
          <Heading
            bgGradient='linear(to-l, brand.100, brand.200)'
            bgClip='text'
          >Trending Ideas</Heading>
          {ideaStateValue.Ideas.map((idea: Idea, index) => (
            <IdeaItem
              idea={idea}
            />
          ))}
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