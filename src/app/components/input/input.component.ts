import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

interface ErrorMessageConfig {
  [key: string]: string | ((error: any) => string);
}


@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label?: string;
  @Input() labelFor?: string;
  @Input() type: 'email' | 'text' | 'password' = 'text';
  @Input() placeholder?: string = '';
  @Input() control!: FormControl;
  @Input() autocomplete = 'off';

  // Allow custom error messages to override defaults
  @Input() customErrorMessages: Partial<ErrorMessageConfig> = {};

  // Default error messages with support for dynamic content
  private defaultErrorMessages: ErrorMessageConfig = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: (error) =>
      `Minimum ${error.requiredLength} characters required (${error.actualLength} provided)`,
    maxlength: (error) =>
      `Maximum ${error.requiredLength} characters allowed (${error.actualLength} provided)`,
    pattern: 'The value format is invalid',
    min: (error) => `Value must be at least ${error.min}`,
    max: (error) => `Value must be at most ${error.max}`,
  };

  get showError(): boolean {
    return (
      this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    );
  }

  get errorMessages(): string[] {
    if (!this.control?.errors) {
      return [];
    }

    return Object.keys(this.control.errors).map((errorKey) => {
      const errorValue = this.control.errors![errorKey];

      // Check for custom error message first
      const customMessage = this.customErrorMessages[errorKey];
      if (customMessage) {
        return typeof customMessage === 'function'
          ? customMessage(errorValue)
          : customMessage;
      }

      // Fall back to default error message
      const defaultMessage = this.defaultErrorMessages[errorKey];
      if (defaultMessage) {
        return typeof defaultMessage === 'function'
          ? defaultMessage(errorValue)
          : defaultMessage;
      }

      // Fallback for unknown validators
      return `Invalid value for ${errorKey}`;
    });
  }

  get firstErrorMessage(): string {
    return this.errorMessages[0] || '';
  }

  // Method to get all errors (useful for complex forms)
  get allErrors(): string[] {
    return this.errorMessages;
  }

  // @Input() errorMessages: Record<string, string> = {
  //   required: 'This field is required',
  //   email: 'Please enter a valid email address',
  //   minlength: 'The value is too short',
  //   maxlength: 'The value is too long',
  //   pattern: 'The value format is invalid',
  // };

  // get showError(): boolean {
  //   return (
  //     this.control &&
  //     this.control.invalid &&
  //     (this.control.dirty || this.control.touched)
  //   );
  // }

  // get firstErrorKey(): string | null {
  //   const errors = this.control?.errors;
  //   return errors ? Object.keys(errors)[0] : null;
  // }

  // get firstErrorMessage(): string {
  //   const key = this.firstErrorKey;
  //   return key ? this.errorMessages[key] || 'Invalid value' : '';
  // }
}
