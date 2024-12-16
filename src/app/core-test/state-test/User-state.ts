// import { User } from '../reducer-test/counter.reducer';
import { user } from '../user-model/user.model';

export interface UserState {
  users: user[];
}

export const initialState: UserState = {
  users: [],
};
