import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadData,
  loadDataSuccess,
  loadDataFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
} from '../action-test/counter-action';
// import { user } from '../user-model/user.model';
import { stat } from 'fs';
import { state } from '@angular/animations';
import { userData } from '../user-model/user.model';

// export interface User {      //form chatgpt
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   mobile: number;
//   image: string | null;
//   address: string;
//   userType: number;
//   isActive: boolean;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

export interface DataState {
  data: userData[];
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
    }))
  ),
});

export const { selectData, selectLoading, selectError } = dataFeature;
