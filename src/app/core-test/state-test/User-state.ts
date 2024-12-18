import { userData } from '../user-model/user.model';

export interface UserState {
  users: userData[];
  selectedData: userData | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  selectedData: null,
  loading: false,
  error: null,
};
