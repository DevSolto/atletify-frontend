import { State } from "./state";

export type City = {
  id: string;
  name: string;
  stateId: string;
  createdAt: string;
  state: State;
  _count: {
    Content: number
  }
};
