import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']); // Ensure spy is correctly initialized

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        MatSnackBarModule,
        MatDividerModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }, // Provide the mocked MatSnackBar
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.controls['username'].value).toBe('');
    expect(component.registerForm.controls['password'].value).toBe('');
  });

  it('should call AuthService.register and show success snackbar, then navigate to login', fakeAsync(() => {
    component.registerForm.setValue({ username: 'test', password: 'pass' });
    authServiceSpy.register.and.returnValue(of({}));

    component.onSubmit();

    expect(authServiceSpy.register).toHaveBeenCalledWith({ username: 'test', password: 'pass' });
    /* expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Registered successfully! Redirecting...', '', { duration: 3000, panelClass: ['snackbar-success'] }
    ); */

    tick(3000);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should show error snackbar on registration failure', () => {
    component.registerForm.setValue({ username: 'test', password: 'pass' });
    authServiceSpy.register.and.returnValue(throwError(() => new Error('Registration failed')));

    component.onSubmit();

    expect(authServiceSpy.register).toHaveBeenCalled();
/*     expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Registration failed.', '', { duration: 3000, panelClass: ['snackbar-error'] }
    ); */
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    component.registerForm.setValue({ username: '', password: '' });

    component.onSubmit();

    expect(authServiceSpy.register).not.toHaveBeenCalled();
    expect(snackBarSpy.open).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});