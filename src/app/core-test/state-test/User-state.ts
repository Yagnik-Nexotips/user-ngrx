import { userData } from '../user-model/user.model';

export interface UserState {
  users: userData[];
}

export const initialState: UserState = {
  users: [],
};
