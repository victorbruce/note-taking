import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: 'app-landing-page',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, PasswordInputComponent, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly errorHandlerService = inject(ErrorHandlerService);
  readonly router = inject(Router);
  readonly showPassword = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading.set(true);

      try {
        const { data, error } = await this.auth.signIn(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        console.log('Login successful:', 'data:', data, 'error:', error);
        if (error) {
          this.errorMessage.set(
            this.errorHandlerService.getErrorMessage(error)
          );
        }
        if (data.user?.role === 'authenticated') {
          this.router.navigate(['/']);
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.errorMessage.set(this.errorHandlerService.getErrorMessage(error));
      } finally {
        this.isLoading.set(false);
      }
    } else {
      // mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  async onGoogleLogin(): Promise<void> {
    this.isLoading.set(true);

    try {
      await this.auth.signInWithGoogle();
    } catch (error) {
      this.errorMessage.set(this.errorHandlerService.getErrorMessage(error));
    } finally {
      this.isLoading.set(false);
    }
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // Navigate to forgot password page or show modal
  }

  onSignUp(): void {
    console.log('Sign up clicked');
    // Navigate to sign up page
  }
}
