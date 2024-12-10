import { User } from '../reducer-test/counter.reducer';

export interface UserState {
  users: User[];
}

export const initialState: UserState = {
  users: [],
};
