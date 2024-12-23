import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TestComponent,
    AddUserComponent,
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngrx-test';
}
