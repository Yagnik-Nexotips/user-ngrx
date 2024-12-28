import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  addUser,
  loadUserDetails,
  loadUserDetailsSuccess,
  updateUser,
} from '../core-test/action-test/counter-action';
import { Type, userData } from '../core-test/user-model/user.model';
import { selectUserById } from '../core-test/selector-test/counter.selectors';
import { CommonModule } from '@angular/common';
import { DataState } from '../core-test/reducer-test/counter.reducer';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  Type = Type;
  isEditMode: boolean = false;
  userId: string | null = null;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    password: new FormControl('123123', Validators.required),
    confirmPassword: new FormControl('123123', Validators.required),
  });

  constructor(
    private store: Store<{ user: DataState }>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = params['id']; // Assumes your route is like /form/:id
      if (userId) {
        this.isEditMode = true; // Editing mode
        this.loadUserDetails(userId); // Load user details for editing
      } else {
        this.isEditMode = false; // Adding mode
      }
    });
  }

  loadData(user: userData): void {
    this.store.dispatch(loadUserDetailsSuccess({ user: user }));
  }

  loadUserDetails(userId: string): void {
    this.store.dispatch(loadUserDetails({ userId }));

    // Now listen for the user data in the store
    this.store.select(selectUserById(userId)).subscribe((response: any) => {
      console.log('Loaded User:', response);
      if (response.status === 'SUCCESS') {
        // Patch form only after user data is available
        this.userForm.patchValue({
          name: response.name,
          username: response.username,
          email: response.email,
          mobile: response.mobile,
          address: response.address,
          role: response.userType,
        });
      } else {
        console.error`User with ID ${userId} not found or state is not initialized.`;
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return alert('form is invalid');
    }

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
