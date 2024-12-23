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
    password: new FormControl('123123', Validators.required),
    confirmPassword: new FormControl('123123', Validators.required),
  });

  constructor(
    private store: Store<{ user: UserState }>,
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
    // this.store.dispatch(loadUserDetails({ userId }));
    this.store.select(selectUserById(userId)).subscribe((user: any) => {
      if (user.status === 'SUCCESS') {
        this.userForm.patchValue({
          name: user.name,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          address: user.address,
          role: user.role,
          password: user.password,
          confirmPassword: user.confirmPassword,
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
