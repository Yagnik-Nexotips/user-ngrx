import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from '../reducer-test/counter.reducer';
import { state } from '@angular/animations';
// import { UserState } from '../state-test/User-state';

export const selectDataState = createFeatureSelector<DataState>('data');
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
// export const selectUserState = (state: { user: DataState }) => state.user;
debugger;
export const selectUserById = (userId: string) =>
  createSelector(selectDataState, (state: DataState) =>
    state.data.filter((data) => data.id === userId)
  );
// export const selectUserById = createSelector(
//   selectDataState,
//   (state: DataState) => state.data
// );

export const DeleteUser = (userId: string) =>
  createSelector(selectDataState, (state: DataState) =>
    state?.data?.filter((user) => user.id === userId)
  );

// export const DeleteUser = createSelector(
//   selectDataState,
//   (state: DataState) => state.data.filter((user) => user.id !== userId)
// )
