import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from '../reducer-test/counter.reducer';
import { UserState } from '../state-test/User-state';

export const selectDataState = createFeatureSelector<UserState>('user');
// Select All Users
export const selectAllUsers = createSelector(
  selectDataState,
  (state: UserState) => state.users
);

// Select Loading State
export const selectUserLoading = createSelector(
  selectDataState,
  (state: UserState) => state.loading
);

// Select Error State
export const selectUserError = createSelector(
  selectDataState,
  (state: UserState) => state.error
);

// Create the feature selector for the 'user' state
export const selectUserState = (state: { user: UserState }) => state.user;

export const selectUserById = (userId: string) =>
  createSelector(
    selectUserState,
    (state: UserState) => state.users.find((user) => user.id === userId) || null
  );
