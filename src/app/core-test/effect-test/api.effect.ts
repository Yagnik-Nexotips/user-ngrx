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
      ofType('[User] Update User'),
      exhaustMap(() =>
        this.tokanService.updateUser(updateUser).pipe(
          map((data) => ({
            type: '[User] Update User Success',
            payload: data,
          })),
          catchError(() => of({ type: '[User] Update User Failure' }))
        )
      )
    )
  );

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserDetails),
      switchMap((action) => {
        console.log('Effect triggered with userId:', action.userId);
        return this.tokanService.getUserDetails(action.userId).pipe(
          map((user) => {
            console.log('API returned user:', user);
            return loadUserDetailsSuccess({ user });
          }),
          catchError((error) => {
            console.error('Error in effect:', error);
            return of(loadUserDetailsFailure({ error }));
          })
        );
      })
    )
  );
}
