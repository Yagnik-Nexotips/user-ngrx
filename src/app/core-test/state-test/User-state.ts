import { userData } from '../user-model/user.model';

export interface UserState {
  users: userData[]; // List of users
  selectedUser: userData | null; // Use 'selectedUser' here
  loading: boolean; // Loading state
  error: string | null; // Error state
}
