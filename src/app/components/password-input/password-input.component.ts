import { Component, signal, Input, Output, EventEmitter } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-input',
  imports: [InputComponent, CommonModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
  @Input() control!: FormControl;
  @Input() labelFor!: string;
  @Input() label = 'Password';
  @Input() placeholder = 'Enter your password';
  @Input() showForgotLink = false;

  @Output() forgotClicked = new EventEmitter<void>();
  show = signal<boolean>(false);

  toggleVisisbility() {
    this.show.update((prev) => !prev);
  }

  onForgot() {
    this.forgotClicked.emit();
  }
}
