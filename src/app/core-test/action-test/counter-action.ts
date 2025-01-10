import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { userData } from '../user-model/user.model';

// Action to trigger loading a user
export const loadData = createAction(
  '[Data] Load Data',
  props<{ payload: any }>()
);
export const loadDataSuccess = createAction(
  '[Data] Load Data Success',
  props<{ data: any }>()
);
export const loadDataFailure = createAction(
  '[Data] Load Data Failure',
  props<{ error: string }>()
);

// Action to trigger adding a user
export const addUser = createAction(
  '[user] Add user',
  props<{ user: userData }>()
);

export const addUserSuccess = createAction(
  '[user] Add user Success',
  props<{ userData: any }>()
);
export const addUserFailure = createAction(
  '[user] Add user Failure',
  props<{ error: string }>()
);

// Action to trigger updating a user
export const updateUser = createAction(
  '[User] Update User',
  props<{ user: userData }>()
);
export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ updatedUser: any }>()
);
export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);

// Action to load user details by user ID
export const loadUserDetails = createAction(
  '[User] Load User Details',
  props<{ userId: string }>()
);

export const loadUserDetailsSuccess = createAction(
  '[User] Load User Details Success',
  props<{ user: userData }>()
);

export const loadUserDetailsFailure = createAction(
  '[User] Load User Details Failure',
  props<{ error: any }>()
);

export const setSelectedUser = createAction(
  '[User] Set Selected User',
  props<{ user: userData }>() // This will pass the userData as the payload
);

//delete action
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: number }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string }>()
);
