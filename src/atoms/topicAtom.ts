import { atom } from "recoil";
import { Idea } from "./ideaAtom";

export interface Topic {
  id: number;
  name: string;
  idea_closure_date: string;
  final_closure_date: string;
  modifyDate: string;
  isDeleted: boolean;
  ideas: Idea[];
}
