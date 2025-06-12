import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CustomJwtUtils } from '../utils/custom-jwt.utils';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    // No token
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded = CustomJwtUtils.decodeToken(token);
      
      const now = Date.now().valueOf() / 1000;
     
      if (decoded.exp && decoded.exp < now) {
        // Token expired
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return false;
      }

      // Token valid
      return true;
    } catch (err) {
      // Invalid token
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
