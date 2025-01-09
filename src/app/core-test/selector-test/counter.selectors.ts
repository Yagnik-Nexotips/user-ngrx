import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from '../reducer-test/counter.reducer';
// import { UserState } from '../state-test/User-state';

export const selectDataState = createFeatureSelector<DataState>('user');
// Select All Users
export const selectAllUsers = createSelector(
  selectDataState,
  (state: DataState) => state.data
);

// Select Loading State
export const selectUserLoading = createSelector(
  selectDataState,
  (state: DataState) => state.loading
);

// Select Error State
export const selectUserError = createSelector(
  selectDataState,
  (state: DataState) => state.error
);

// Create the feature selector for the 'user' state
export const selectUserState = (state: { user: DataState }) => state.user;

export const selectUserById = (userId: string) =>
  createSelector(selectUserState, (state: DataState) =>
    state.data.find((user) => user.id === userId)
  );
