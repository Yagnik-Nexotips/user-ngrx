import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { addUser } from '../core-test/action-test/counter-action';
import { userData } from '../core-test/user-model/user.model';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  userForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl(''),
    userType: new FormControl(null),
  });

  constructor(private store: Store, private router: Router) {}

  onSubmit() {
    const formValues = this.userForm.value;

    const newUser: userData = {
      id: Date.now().toString(),
      name: formValues.name || '',
      username: formValues.username || '',
      email: formValues.email || '',
      mobile: formValues.mobile || '',
      address: formValues.address || '',
      userType: formValues.userType || null,
    };

    this.store.dispatch(addUser({ user: newUser }));

    console.log('New User:', this.userForm);

    this.router.navigate(['/table']);
  }
}
