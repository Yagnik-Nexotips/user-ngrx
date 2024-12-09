import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/table' },
  { path: 'table', component: TestComponent },
  { path: 'form', component: AddUserComponent },
];
