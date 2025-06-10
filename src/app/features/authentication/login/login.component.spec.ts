import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

// Mocks
const mockAuthService = {
  login: jasmine.createSpy('login')
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {} },
        provideHttpClient()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty values', () => {
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  });

  it('should call AuthService.login and navigate on successful login', () => {
    const fakeToken = 'fake-jwt-token';
    mockAuthService.login.and.returnValue(of({ token: fakeToken }));
    spyOn(localStorage, 'setItem');

    component.loginForm.setValue({ username: 'user', password: 'pass' });
    component.onLogin();

    expect(mockAuthService.login).toHaveBeenCalledWith({ username: 'user', password: 'pass' });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', fakeToken);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should show alert on login error', () => {
    spyOn(window, 'alert');
    mockAuthService.login.and.returnValue(throwError(() => new Error('Invalid login')));

    component.loginForm.setValue({ username: 'wrong', password: 'wrong' });
    component.onLogin();

    expect(window.alert).toHaveBeenCalledWith('Login failed');
  });
});
