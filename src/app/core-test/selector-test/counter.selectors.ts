import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from '../reducer-test/counter.reducer';

export const selectDataState = createFeatureSelector<DataState>('data');
export const selectData = createSelector(
  selectDataState,
  (state) => state.data
);
export const selectLoading = createSelector(
  selectDataState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectDataState,
  (state) => state.error
);
