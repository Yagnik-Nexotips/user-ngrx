import { createAction, props } from '@ngrx/store';
// import { User } from '../reducer-test/counter.reducer';
import { user, userData } from '../user-model/user.model';

export const loadData = createAction(
  '[Data] Load Data',
  props<{ payload: any }>()
);
export const loadDataSuccess = createAction(
  '[Data] Load Data Success',
  props<{ data: any[] }>()
);
export const loadDataFailure = createAction(
  '[Data] Load Data Failure',
  props<{ error: string }>()
);

export const addUser = createAction(
  '[user] Add user',
  props<{ user: userData }>()
);

export const addUserSuccess = createAction(
  '[user] Add user Success',
  props<{ user: any[] }>()
);
export const addUserFailure = createAction(
  '[user] Add user Failure',
  props<{ error: string }>()
);
