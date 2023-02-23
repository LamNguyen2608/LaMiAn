import { atom } from "recoil";

export interface Idea {
  id: number;
  name: string;
  body: string;
  date: string;
  modify_date: string;
  attached_path: string;
  reactions: any[];
  category: any[];
}
