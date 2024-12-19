import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  addUser,
  addUserSuccess,
  loadUserDetails,
  updateUser,
} from '../core-test/action-test/counter-action';
import { Type, userData } from '../core-test/user-model/user.model';
import { selectUserById } from '../core-test/selector-test/counter.selectors';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  Type = Type;
  isEditMode: boolean = false;
  userId: string | null = null;

  userForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInIt() {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');

      if (userId) {
        this.isEditMode = true;
        this.store.dispatch(loadUserDetails({ userId: userId }));
      } else {
        console.log('User ID not found!');
      }
    });

    if (this.isEditMode) {
      this.store.select(selectUserById(this.userId!)).subscribe((user) => {
        if (user) {
          this.userForm.patchValue({
            name: user.name,
            username: user.username,
            email: user.email,
            mobile: user.mobile,
            address: user.address,
            role: user.role,
          });
        }
      });
    }
  }

  onSubmit() {
    const formValues = this.userForm.value;

    const userId = this.userId || undefined;

    const newUser: userData = {
      name: formValues.name || '',
      username: formValues.username || '',
      email: formValues.email || '',
      mobile: formValues.mobile || '',
      address: formValues.address || '',
      confirmPassword: '123123',
      password: '123123',
      role: formValues.role || '',
      id: userId,
    };

    console.log('Payload being sent:', newUser);

    const user = {
      ...this.userForm.value, // Spread the form values
      id: userId, // Add the userId
      confirmPassword: '123123', // Include confirmPassword
      password: '123123', // Include password
    };

    if (this.isEditMode && this.userId) {
      // Dispatch update user action if in edit mode
      this.store.dispatch(updateUser({ user }));
    } else {
      // Dispatch add user action if in add mode
      this.store.dispatch(addUser({ user: newUser }));
    }

    this.router.navigate(['/table']);
  }
}
