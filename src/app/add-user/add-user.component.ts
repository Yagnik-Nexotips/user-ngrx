import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  RouterEvent,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Router } from 'express';
import { routes } from '../app.routes';

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
  newUser = {
    name: '',
    username: '',
    email: '',
    mobile: '',
    address: '',
    userType: '',
  };

  onSubmit() {
    console.log('New User:', this.newUser);
    console.log('New User:', this.newUser.name);

    // Add logic to send the new user to your backend
  }
}
