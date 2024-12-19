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

// Select User by ID
export const selectUserById = (userId: string) =>
  createSelector(selectAllUsers, (users) =>
    users.find((user) => user.id === userId)
  );
