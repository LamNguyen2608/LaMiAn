
import { Timestamp } from "firebase/firestore";
import {atom} from "recoil";

export type Post ={

  // departmentId: string;
  employeeId: string;
  employeeName: string; 
  title: string;
  body: string;
  cat?: {value: string; label: string}[];
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  createdTime: Timestamp;
};

interface PostState {
  selectedPost: Post | null; 
  posts: Post[];
  //postVotes
}

const defaultPostState: PostState = {
  selectedPost: null, 
  posts:[],
};

export const postState = atom<PostState>({
  key:"postState", 
  default: defaultPostState,
});