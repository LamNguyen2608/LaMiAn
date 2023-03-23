import { atom } from "recoil";
import { Idea } from "./ideaAtom";
import { Topic } from "./topicAtom";

export interface searchState {
  currentSearch: string;
  idea: Idea[];
  topic: Topic[];
  allIdea: Idea[];
  allTopic: Topic[];
  viewTopic: string;
}

const defaultSearchState: searchState = {
  currentSearch: "",
  idea: [],
  topic: [],
  allIdea: [],
  allTopic: [],
  viewTopic: "",
};

export const searchState = atom<searchState>({
  key: "searchState",
  default: defaultSearchState,
});
