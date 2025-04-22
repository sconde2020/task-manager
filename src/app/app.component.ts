import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar class="custom-navbar">
      <span class="logo">📝 Task Manager</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/login"><mat-icon>login</mat-icon> Login</a>
      <a mat-button routerLink="/tasks"><mat-icon>list</mat-icon> Tasks</a>
      <button mat-stroked-button color="warn" (click)="onLogout()">
         <mat-icon>logout</mat-icon> Logout
      </button>
    </mat-toolbar>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private authService: AuthService) {}

  onLogout(): void {
    if (confirm('Are you sure you want to disconnect from Task Manager ?')) {
      this.authService.logout();
    }
  }
}
