import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  addUser,
  loadUserDetails,
  updateUser,
} from '../core-test/action-test/counter-action';
import { Type, userData } from '../core-test/user-model/user.model';
import { selectUserById } from '../core-test/selector-test/counter.selectors';
import { CommonModule } from '@angular/common';
import { UserState } from '../core-test/state-test/User-state';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  Type = Type;
  isEditMode: boolean = false;
  userId: string | null = null;
  selectedUser: userData | null = null;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private store: Store<UserState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = '';
    // Fetch the userId from the route parameters (for editing)
    this.store.select(selectUserById).subscribe(user) => {
      this.selectedUser = userId;
      if (this.userId) {
        this.isEditMode = true; // Set Edit Mode
        this.userId = this.userId; // Save the userId
        this.store.dispatch(loadUserDetails({ userId }));
        this.store.select(selectUserById(this.userId)).subscribe((user) => {
          if (user) {
            this.userForm.patchValue(user); // Populate the form with user data
          }
        });
      }
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const formValues = this.userForm.value;
    const user: userData = {
      name: formValues.name || '',
      username: formValues.username || '',
      email: formValues.email || '',
      mobile: formValues.mobile || '',
      address: formValues.address || '',
      confirmPassword: '123123', // Hardcoded as placeholder
      password: '123123', // Hardcoded as placeholder
      role: formValues.role || '',
    };

    if (this.isEditMode) {
      this.store.dispatch(updateUser({ user }));
    } else {
      this.store.dispatch(addUser({ user }));
    }

    this.router.navigate(['/table']); // Navigate back to the table after submitting
  }
}
