import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadData,
  loadDataSuccess,
  loadDataFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  loadUserDetails,
  loadUserDetailsSuccess,
  loadUserDetailsFailure,
} from '../action-test/counter-action';
import { userData } from '../user-model/user.model';

export interface DataState {
  data: userData[];
  loading: boolean;
  error: string | null;
  selectedUser: userData | null; // Single user data (for edit mode)
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
  selectedUser: null, // Initialize selectedUser to null
};

export const dataFeature = createFeature({
  name: 'data',
  reducer: createReducer(
    initialState,
    // Load all users
    on(loadData, (state) => ({ ...state, loading: true, error: null })),
    on(loadDataSuccess, (state, { data }) => ({
      ...state,
      loading: false,
      data: data as userData[],
    })),
    on(loadDataFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    // Add a new user
    on(addUser, (state) => ({ ...state, loading: true, error: null })),
    on(addUserSuccess, (state, { userData }) => ({
      ...state,
      loading: false,
      data: [...state.data, userData], // Add new user to the array
    })),
    on(addUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    // Update an existing user
    on(updateUser, (state) => ({ ...state, loading: true, error: null })),
    on(updateUserSuccess, (state, { updatedUser }) => ({
      ...state,
      loading: false,
      data: state.data.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
      selectedUser: null, // Reset selectedUser after successful update
    })),
    on(updateUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    // Load a single user for edit mode
    on(loadUserDetails, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(loadUserDetailsSuccess, (state, { user }) => ({
      ...state,
      loading: false,
      selectedUser: user, // Set selectedUser for edit mode
    })),
    on(loadUserDetailsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});

export const { selectData, selectLoading, selectError } = dataFeature;
