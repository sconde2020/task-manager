import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <nav>
        <a routerLink="/login">Login</a>
        <a routerLink="/tasks">Tasks</a>
        <a routerLink="/logout">Logout</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container { display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 20px;}
    nav { display: flex; gap: 20px; padding: 10px; background: #eee; }
    a { text-decoration: none; font-weight: bold; }
  `]
})
export class AppComponent {}