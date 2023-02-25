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

interface IdeaState {
  selectedIdea: Idea | null;
  Ideas: Idea[];
  //IdeaVotes
}

const defaultIdeaState: IdeaState = {
  selectedIdea: null,
  Ideas: [],
};

export const ideaState = atom<IdeaState>({
  key: "IdeaState",
  default: defaultIdeaState,
});
