import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../core-test/reducer-test/counter.reducer';
import { Store } from '@ngrx/store';
import { addUser } from '../core-test/action-test/counter-action';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  name = '';
  email = '';

  newUser = {
    name: '',
    username: '',
    email: '',
    mobile: '',
    address: '',
    userType: '',
  };

  constructor(private store: Store) {}

  onSubmit() {
    console.log('New User:', this.newUser);

    const newUser: User = {
      id: Date.now().toString(),
      name: this.name,
      email: this.email,
    };
    this.store.dispatch(addUser({ user: newUser }));

    // Add logic to send the new user to your backend
  }
}
