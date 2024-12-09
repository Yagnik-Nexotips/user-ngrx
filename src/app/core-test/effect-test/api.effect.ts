import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadData,
  loadDataSuccess,
  loadDataFailure,
} from '../action-test/counter-action';
import { TokanServiceService } from '../../tokan.service.service';
import { of } from 'rxjs';

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
}
