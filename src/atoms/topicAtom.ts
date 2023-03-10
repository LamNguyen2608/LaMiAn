import { atom } from 'recoil';
import { Idea } from './ideaAtom';

export interface Topic {
  id?: number;
  name: string;
  body?: string;
  imageURL?: string | null | undefined;
  topic_closure_date: string;
  final_closure_date: string;
  modifyDate?: string;
  isDeleted?: boolean;
  ideas?: Idea[];
}

export type ClientFollow = {
  client_id: {
    id: string;
    firstname: string;
    lastname: string;
  };
};
export interface TopicSnippet {
  topic_id: number;
  client_id: string;
  client_role: string;
  topic_name: string;
  topic_imageURL: string;
}

interface TopicState {
  followedTopics: TopicSnippet[];
  initTopicsFetched: boolean;
  // visitedCommunities: {
  //   [key: string]: Topic;
  // };
  currentTopic: Topic | null;
}

// export const defaultTopic: Topic = {
// id: ,
// creatorId: "",
// numberOfMembers: 0,
// privacyType: "public",
// };

export const defaultTopicState: TopicState = {
  followedTopics: [],
  initTopicsFetched: false,
  // visitedCommunities: {},
  currentTopic: null,
};

export const TopicState = atom<TopicState>({
  key: 'TopicState',
  default: defaultTopicState,
});
