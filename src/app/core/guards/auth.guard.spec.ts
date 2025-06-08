import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import * as jwtDecodeModule from 'jwt-decode';

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
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return true if token is valid and not expired', () => {
    const fakeToken = 'valid.token';
    localStorage.setItem('token', fakeToken);

    spyOn(jwtDecodeModule, 'jwtDecode').and.returnValue({
      exp: Math.floor(Date.now() / 1000) + 1000
    });

    const result = guard.canActivate();
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should return false and redirect if token is expired', () => {
    const fakeToken = 'expired.token';
    localStorage.setItem('token', fakeToken);

    spyOn(jwtDecodeModule, 'jwtDecode').and.returnValue({
      exp: Math.floor(Date.now() / 1000) - 1000
    });

    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should return false and redirect if jwtDecode throws', () => {
    const fakeToken = 'invalid.token';
    localStorage.setItem('token', fakeToken);

    spyOn(jwtDecodeModule, 'jwtDecode').and.throwError('Invalid token');

    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should return false and redirect if token is missing', () => {
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
