import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private basePath = 'auth';

  constructor(private apiService: ApiService, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    return this.apiService.post(`${this.basePath}/login`, credentials);
  }

  logout(): void {
    this.apiService.post(`${this.basePath}/logout`, {}).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
