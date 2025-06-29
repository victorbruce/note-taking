import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error-handler.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    PasswordInputComponent,
    LoaderComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly errorHandlerService = inject(ErrorHandlerService);
  registerForm!: FormGroup;
  readonly router = inject(Router);
  readonly showPassword = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit() {
    console.log('sign me up');
    if (this.signupForm.valid) {
      this.isLoading.set(true);

      try {
        const { data, error } = await this.auth.signUp(
          this.signupForm.value.email,
          this.signupForm.value.password
        );
        console.log('Signup successful:', 'data');

        if (error) {
          this.errorMessage.set(
            this.errorHandlerService.getErrorMessage(error)
          );
        }

        if (data.user?.role === 'authenticated') {
          this.router.navigate(['/']);
        }
      } catch (error) {
        console.error('Login failed', error);
        this.errorMessage.set(this.errorHandlerService.getErrorMessage(error));
      } finally {
        this.isLoading.set(false);
      }
    } else {
      Object.keys(this.signupForm.controls).forEach((key) => {
        this.signupForm.get(key)?.markAsTouched();
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
    this.router.navigate(['/forgot-password']);
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }
}
