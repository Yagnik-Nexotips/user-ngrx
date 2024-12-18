import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  loadData,
  loadDataSuccess,
  loadDataFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
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

  // update$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(updateUser),
  //   switchMap((actions) =>
  //   this.tokanService.
  //   )
  // ))
}
