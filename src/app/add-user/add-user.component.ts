import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { addUser } from '../core-test/action-test/counter-action';

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

  constructor(private store: Store, private router: Router) {}

  onSubmit() {
    console.log('New User:', this.newUser);

    this.store.dispatch(
      addUser({
        user: {
          query: { isDeleted: false },
          options: { select: null, page: 1, paginate: 10 },
          isCountOnly: false,
        },
      })
    );

    // const newUser: User = {                     //this is from chatgpt
    //   id: Date.now().toString(),
    //   name: this.name,
    //   email: this.email,
    // };
    // this.store.dispatch(addUser({ user: newUser }));

    // Add logic to send the new user to your backend
    this.router.navigate(['/table']);
  }

  // gotoTable() {
  //   this.router.navigate(['/table']);
  // }
}
