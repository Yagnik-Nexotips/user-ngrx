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
  deleteUser,
  deleteUserSuccess,
} from '../action-test/counter-action';
import { userData } from '../user-model/user.model';
import { state } from '@angular/animations';
import { elementAt } from 'rxjs';

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
      data: [...state.data, ...data], // Assuming loadDataSuccess sends an array of users
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
      selectedUser: null, // Reset selectedUser while loading
    })),
    on(loadUserDetailsSuccess, (state, { user }) => ({
      ...state,
      loading: false,
      data: state.data.map((u) => (u.id === user.id ? user : u)), // Update user in the data array
      selectedUser: user, // Set the selectedUser for edit mode
    })),
    on(loadUserDetailsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
      selectedUser: null, // In case of failure, reset selectedUser
    })),
    // Delete a single user
    on(deleteUserSuccess, (state, { userId }) => ({
      ...state,
      data: state.data.filter((user) => user.id !== userId),
    }))
  ),
});

export const { selectData, selectLoading, selectError, selectSelectedUser } =
  dataFeature;
