import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CustomJwtUtils } from '../utils/custom-jwt.utils';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return false and navigate to login if no token is present', () => {
    localStorage.removeItem('token');

    const result = guard.canActivate();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });

  it('should return false and navigate if token is expired', () => {
    const expiredToken = 'expired-token';
    localStorage.setItem('token', expiredToken);

    spyOn(CustomJwtUtils, 'decodeToken').and.returnValue({
      exp: Math.floor(Date.now() / 1000) - 10 // expired
    });

    const result = guard.canActivate();

    expect(CustomJwtUtils.decodeToken).toHaveBeenCalledWith(expiredToken);
    expect(localStorage.getItem('token')).toBeNull(); // removed
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });

  it('should return true if token is valid', () => {
    const validToken = 'valid-token';
    localStorage.setItem('token', validToken);

    spyOn(CustomJwtUtils, 'decodeToken').and.returnValue({
      exp: Math.floor(Date.now() / 1000) + 3600 // valid 1h
    });

    const result = guard.canActivate();

    expect(CustomJwtUtils.decodeToken).toHaveBeenCalledWith(validToken);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(result).toBeTrue();
  });

  it('should return false and navigate if token is invalid (decode throws)', () => {
    const invalidToken = 'bad-token';
    localStorage.setItem('token', invalidToken);

    spyOn(CustomJwtUtils, 'decodeToken').and.throwError('Invalid token');

    const result = guard.canActivate();

    expect(CustomJwtUtils.decodeToken).toHaveBeenCalledWith(invalidToken);
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });
});
