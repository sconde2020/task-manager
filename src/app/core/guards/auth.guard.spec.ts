/* import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let jwtDecodeSpy: jasmine.Spy;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    localStorageSpy = jasmine.createSpyObj('Storage', ['getItem', 'removeItem']);
    
    // Create a fresh spy for each test
    jwtDecodeSpy = jasmine.createSpy('jwtDecode').and.callThrough();
   // spyOn(jwtDecode, 'jwtDecode').and.callFake(jwtDecodeSpy);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy },
        { provide: 'LOCAL_STORAGE', useValue: localStorageSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  // describe('when no token exists', () => {
  //   beforeEach(() => {
  //     localStorageSpy.getItem.withArgs('token').and.returnValue(null);
  //   });

  //   it('should return false', () => {
  //     expect(guard.canActivate()).toBeFalse();
  //   });

  //   it('should redirect to login', () => {
  //     guard.canActivate();
  //     expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  //   });
  // });

  // describe('with valid token', () => {
  //   beforeEach(() => {
  //     localStorageSpy.getItem.withArgs('token').and.returnValue('valid-token');
  //     jwtDecodeSpy.and.returnValue({
  //       exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour in future
  //     });
  //   });

  //   it('should return true', () => {
  //     expect(guard.canActivate()).toBeTrue();
  //   });

  //   it('should not redirect', () => {
  //     guard.canActivate();
  //     expect(routerSpy.navigate).not.toHaveBeenCalled();
  //   });
  // });

  // describe('with expired token', () => {
  //   beforeEach(() => {
  //     localStorageSpy.getItem.withArgs('token').and.returnValue('expired-token');
  //     jwtDecodeSpy.and.returnValue({
  //       exp: Math.floor(Date.now() / 1000) - 3600 // 1 hour in past
  //     });
  //   });

  //   it('should return false', () => {
  //     expect(guard.canActivate()).toBeFalse();
  //   });

  //   it('should remove token from storage', () => {
  //     guard.canActivate();
  //     expect(localStorageSpy.removeItem).toHaveBeenCalledWith('token');
  //   });

  //   it('should redirect to login', () => {
  //     guard.canActivate();
  //     expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  //   });
  // });

  // describe('with invalid token', () => {
  //   beforeEach(() => {
  //     localStorageSpy.getItem.withArgs('token').and.returnValue('invalid-token');
  //     jwtDecodeSpy.and.throwError('Invalid token');
  //   });

  //   it('should return false', () => {
  //     expect(guard.canActivate()).toBeFalse();
  //   });

  //   it('should remove token from storage', () => {
  //     guard.canActivate();
  //     expect(localStorageSpy.removeItem).toHaveBeenCalledWith('token');
  //   });
  // });
}); */