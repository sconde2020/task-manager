import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should not add Authorization header for excluded /login URL', () => {
    localStorage.setItem('token', 'test-token');

    const req = new HttpRequest('GET', '/api/auth/login');
    const handler: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeFalse();
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(req, handler).subscribe();
  });

  it('should not add Authorization header for excluded /register URL', () => {
    localStorage.setItem('token', 'test-token');

    const req = new HttpRequest('POST', '/api/auth/register', 'FAKE-CREDENTIALS');
    const handler: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeFalse();
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(req, handler).subscribe();
  });

  it('should add Authorization header if token is present and URL is not excluded', () => {
    const token = 'test-token';
    localStorage.setItem('token', token);

    const req = new HttpRequest('GET', '/api/data');
    const handler: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeTrue();
        expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`);
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(req, handler).subscribe();
  });

  it('should not add Authorization header if no token is present', () => {
    const req = new HttpRequest('GET', '/api/data');
    const handler: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeFalse();
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(req, handler).subscribe();
  });
});
