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
  updateUser,
} from '../core-test/action-test/counter-action';
import { Type, userData } from '../core-test/user-model/user.model';
import { selectUserById } from '../core-test/selector-test/counter.selectors';
import { CommonModule } from '@angular/common';
import {
  DataState,
  selectSelectedUser,
} from '../core-test/reducer-test/counter.reducer';
import { state } from '@angular/animations';

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
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
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

  loadUserDetails(userId: string): void {
    this.store.dispatch(loadUserDetails({ userId })); // Dispatch action to load user details

    this.store.select(selectSelectedUser).subscribe((user) => {
      if (user) {
        console.log('Loaded User:', user);
        this.userForm.patchValue({
          name: user.name,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          address: user.address,
          role: user.role,
          password: '', // Hardcoded or pre-filled value
          confirmPassword: '', // Hardcoded or pre-filled value
        });
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
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
