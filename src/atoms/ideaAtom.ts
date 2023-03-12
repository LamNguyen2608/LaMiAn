import { atom } from "recoil";

export interface Idea {
  id: number;
  name: string;
  body: string;
  date: string;
  modify_date: string;
  attached_path: string | null | undefined;
  topic: { id: number; name: string };
  reactions: { id: number; reaction: boolean | null | undefined }[];
  idea_cate: { cate_id: { id: number; name: string } }[];
  client: { id: string; firstname: string; lastname: string };
  comments: any[];
  isAnonymous: boolean;
}

export interface IdeaDetails {
  id: number;
  name: string;
  body: string;
  date: string;
  modify_date: string;
  attached_path: string;
  topic: { id: number; name: string }[];
  client: { id: string; firstname: string; lastname: string }[];
  reactions: any[];
  comments: {
    id: number;
    comment: string;
    modify_date: string;
    client: { id: string; firstname: string; lastname: string };
    isAnonymous: boolean;
  }[];
  idea_cate: any[];
}

export type myVote = {
  reaction_id?: number;
  idea_id: number;
  reaction: boolean | null | undefined;
};
export interface IdeaState {
  selectedIdea: Idea | null;
  Ideas: Idea[];
  IdeaVotes: myVote[];
  selectedIdeaDetails: IdeaDetails | null;
}

const defaultIdeaState: IdeaState = {
  IdeaVotes: [],
  selectedIdea: null,
  Ideas: [],
  selectedIdeaDetails: null,
};

export const ideaState = atom<IdeaState>({
  key: "IdeaState",
  default: defaultIdeaState,
});
