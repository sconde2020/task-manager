import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private basePath = 'auth';

  constructor(private apiService: ApiService, private router: Router) {}

  register(credentials: { username: string; password: string }): Observable<any> {
    return this.apiService.post(`${this.basePath}/register`, credentials);
  }
  
  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    return this.apiService.post(`${this.basePath}/login`, credentials);
  }

  logout(): void {
    this.apiService.post(`${this.basePath}/logout`, {}).subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        localStorage.removeItem('token'); // Ensure token is removed even on error
        this.router.navigate(['/login']);
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
