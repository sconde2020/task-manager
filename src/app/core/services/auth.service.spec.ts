import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideHttpClient()
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call register with correct credentials', () => {
    const mockCredentials = { username: 'test', password: 'pass' };
    const mockResponse = { success: true };
    apiServiceSpy.post.and.returnValue(of(mockResponse));

    service.register(mockCredentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith('auth/register', mockCredentials);
  });

  it('should call login with correct credentials and return token', () => {
    const mockCredentials = { username: 'test', password: 'pass' };
    const mockResponse = { token: 'abc123' };
    apiServiceSpy.post.and.returnValue(of(mockResponse));

    service.login(mockCredentials).subscribe(response => {
      expect(response.token).toBe('abc123');
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith('auth/login', mockCredentials);
  });

  it('should call logout and navigate to login', () => {
    apiServiceSpy.post.and.returnValue(of(undefined));
    spyOn(localStorage, 'removeItem');

    service.logout();

    expect(apiServiceSpy.post).toHaveBeenCalledWith('auth/logout', {});
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return token from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('abc123');
    const token = service.getToken();
    expect(token).toBe('abc123');
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('should handle logout error gracefully', fakeAsync(() => {
    apiServiceSpy.post.and.returnValue(throwError(() => new Error('Logout failed')));
    spyOn(localStorage, 'removeItem');

    service.logout()
    tick();

    expect(apiServiceSpy.post).toHaveBeenCalledWith('auth/logout', {});
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));
});