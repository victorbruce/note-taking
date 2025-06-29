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
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PasswordInputComponent,
    LoaderComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly errorHandlerService = inject(ErrorHandlerService);
  readonly router = inject(Router);
  readonly showPassword = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly resetPasswordForm: FormGroup = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: this.passwordMatchValidator }
  );

  get newPasswordControl(): FormControl {
    return this.resetPasswordForm.get('newPassword') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.resetPasswordForm.get('confirmPassword') as FormControl;
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get passwordMismatch(): boolean | undefined {
    return (
      this.resetPasswordForm.hasError('passwordMismatch') &&
      this.resetPasswordForm.get('confirmPassword')?.touched
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.resetPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    console.log('reseting password');
  }
}
