import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  addUser,
  addUserSuccess,
} from '../core-test/action-test/counter-action';
import { Type, userData } from '../core-test/user-model/user.model';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  Type = Type;

  userForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(private store: Store, private router: Router) {}

  onSubmit() {
    const formValues = this.userForm.value;

    const newUser: userData = {
      name: formValues.name || '',
      username: formValues.username || '',
      email: formValues.email || '',
      mobile: formValues.mobile || '',
      address: formValues.address || '',
      confirmPassword: '123123',
      password: '123123',
      role: formValues.role || '',
    };

    console.log('Payload being sent:', newUser);

    this.store.dispatch(addUser({ user: newUser }));

    this.router.navigate(['/table']);
  }
}
