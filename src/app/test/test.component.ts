import { Component, OnInit } from '@angular/core';
import {
  deleteUser,
  deleteUserSuccess,
  loadData,
} from '../core-test/action-test/counter-action';
import { Store } from '@ngrx/store';
import {
  selectData,
  selectError,
  selectLoading,
} from '../core-test/reducer-test/counter.reducer';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  data$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store.select(selectData);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);

    this.store.dispatch(
      loadData({
        payload: {
          query: { isDeleted: false },
          options: { select: null, page: 1, paginate: 100 },
          isCountOnly: false,
        },
      })
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(deleteUserSuccess({ userId }));
    }
  }
}
