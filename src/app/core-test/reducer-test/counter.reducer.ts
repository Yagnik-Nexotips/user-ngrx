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
import { stat } from 'fs';
import { state } from '@angular/animations';
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
    on(addUser, (state) => ({ ...state, loading: true, error: null })),
    on(addUserSuccess, (state, { userData }) => ({
      ...state,
      users: [...state.data, addUser],
    })),
    on(addUserFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(updateUser, (state) => ({ ...state, loading: true, error: null })),
    on(updateUserSuccess, (state, { updatedUser }) => ({
      ...state,
      loading: false,
      data: state.data.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
    on(updateUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    // Handle loading of a single user (for edit mode)
    on(loadUserDetails, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(loadUserDetailsSuccess, (state, { user }) => ({
      ...state,
      loading: false,
      selectedUser: user,
    })),
    on(loadUserDetailsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});

export const { selectData, selectLoading, selectError } = dataFeature;
