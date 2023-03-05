import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Idea {
  id?: number;
  name: string;
  body: string;
  date: string | Timestamp;
  modify_date: string;
  attached_path: string | null | undefined;
  reactions?: any[];
  category?: any[];
  client_id?: string;
  topic_id?: number;
}

export type myVote = {
  reaction_id: number;
  idea_id: number;
  reaction: boolean | null | undefined;
};
export interface IdeaState {
  selectedIdea: Idea | null;
  Ideas: Idea[];
  IdeaVotes: myVote[];
}

const defaultIdeaState: IdeaState = {
  IdeaVotes: [],
  selectedIdea: null,
  Ideas: [],
};

export const ideaState = atom<IdeaState>({
  key: "IdeaState",
  default: defaultIdeaState,
});
