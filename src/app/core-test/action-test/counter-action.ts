import { createAction, props } from '@ngrx/store';
import { User } from '../reducer-test/counter.reducer';

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

export const addUser = createAction('[User] Add User', props<{ user: User }>());
