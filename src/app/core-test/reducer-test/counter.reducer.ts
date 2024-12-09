import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import {
  loadData,
  loadDataSuccess,
  loadDataFailure,
} from '../action-test/counter-action';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  mobile: number;
  image: string | null;
  address: string;
  userType: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DataState {
  data: User[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const dataFeature = createFeature({
  name: 'data',
  reducer: createReducer(
    initialState,
    on(loadData, (state) => ({ ...state, loading: true, error: null })),
    on(loadDataSuccess, (state, { data }) => ({
      ...state,
      loading: false,
      data: data as User[],
    })),
    on(loadDataFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});

export const { selectData, selectLoading, selectError } = dataFeature;
