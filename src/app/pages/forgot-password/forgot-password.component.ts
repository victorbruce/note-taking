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
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, LoaderComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly errorHandlerService = inject(ErrorHandlerService);
  readonly router = inject(Router);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl(): FormControl {
    return this.forgotPasswordForm.get('email') as FormControl;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    console.log('resending forgot password link');
  }
}
