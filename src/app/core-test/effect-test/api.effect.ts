import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import {
  loadData,
  loadDataSuccess,
  loadDataFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
  loadUserDetails,
  loadUserDetailsSuccess,
  loadUserDetailsFailure,
  setSelectedUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  deleteUser,
} from '../action-test/counter-action';
import { TokanServiceService } from '../../tokan.service.service';
import { of } from 'rxjs';

@Injectable()
export class DataEffects {
  constructor(
    private actions$: Actions,
    private tokanService: TokanServiceService
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadData),
      switchMap((action) => {
        return this.tokanService.getData(action.payload).pipe(
          map((data) => loadDataSuccess({ data })),
          catchError((error) => of({ type: '[User] Load User Failure', error }))
        );
      })
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      mergeMap((actions) =>
        this.tokanService.addUser(actions.user).pipe(
          map((userData) => addUserSuccess({ userData })),
          catchError((error) => {
            return of(addUserFailure({ error }));
          })
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      exhaustMap((action) =>
        this.tokanService.updateUser(action.user).pipe(
          map(
            (updatedUser) => updateUserSuccess({ updatedUser }) // Pass the updated user object
          ),
          catchError((error) =>
            of(updateUserFailure({ error: error.message || 'Update failed' }))
          )
        )
      )
    )
  );

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserDetails),
      switchMap((action) =>
        this.tokanService.getUserDetails(action.userId).pipe(
          map((user) => loadUserDetailsSuccess({ user })),
          catchError((error) => of(loadUserDetailsFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap(({ id }) =>
        this.tokanService.deleteUser(id).pipe(
          map(() => deleteUserSuccess({ id })),
          catchError((error) => of(deleteUserFailure({ error: error.message })))
        )
      )
    )
  );
}
