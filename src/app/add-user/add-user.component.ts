import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
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

    // const newUser: User = {                     //this is from chatgpt
    //   id: Date.now().toString(),
    //   name: this.name,
    //   email: this.email,
    // };
    // this.store.dispatch(addUser({ user: newUser }));

    // Add logic to send the new user to your backend
  }
}
