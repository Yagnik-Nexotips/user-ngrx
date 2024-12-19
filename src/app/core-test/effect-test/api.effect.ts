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
  updateUserSuccess,
  updateUserFailure,
} from '../action-test/counter-action';
import { TokanServiceService } from '../../tokan.service.service';
import { of } from 'rxjs';
import { error } from 'console';
import { userData } from '../user-model/user.model';

@Injectable()
export class DataEffects {
  constructor(
    private actions$: Actions,
    private tokanService: TokanServiceService
  ) {}

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadData),
      switchMap((action) => {
        return this.tokanService.getData(action.payload).pipe(
          map((data) => {
            return loadDataSuccess({ data });
          }),
          catchError((error) => {
            return of(loadDataFailure({ error }));
          })
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
  // updateData$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateUser),
  //     mergeMap((actions) =>
  //       this.tokanService.updateUser(actions.user).pipe(
  //         map((updatedUser) => updateUserSuccess({ updatedUser })),
  //         catchError((error) => of(updateUserFailure({ error })))
  //       )
  //     )
  //   )
  // );
}
