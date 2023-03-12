import { atom } from "recoil";
import { Idea } from "./ideaAtom";

export type Client = {
  id: string;
  firstname: string;
  lastname: string;
  age: string;
  client_info: string;
  role: string;
  pronoun: string;
  email: string;
  isDeleted: boolean;
  department: {
    id: number;
    name: string;
    department_info: string;
    isDeleted: boolean;
  };
  ideas: Idea[];
  reactions: {
    id: number;
    reaction: boolean;
  }[];
  comments: {
    id: number;
    comment: string;
    modify_date: string;
    client: { id: string; firstname: string; lastname: string };
    isAnonymous: boolean;
  }[];
};
export interface ClientState {
  currentClient: Client | undefined;
}

const defaultClientState: ClientState = {
  currentClient: undefined,
};

export const clientState = atom<ClientState>({
  key: "ClientState",
  default: defaultClientState,
});
