import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  //INJECTS
  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group(
    {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ],
      ],
    },
    {
      validators: [this.passwordMatchValidator],
    }
  );

  //METHODS
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return '';

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Campo requerido';

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;

        case 'maxlength':
          return `Maximo ${errors['maxlength'].requiredLength} caracteres`;

        case 'email':
          return 'Email invalido';

        case 'pattern':
          return 'Password must contain at least one letter, one number and one capital letter';

        default:
          break;
      }
    }

    return null;
  }

  isValidField(field: string): boolean | undefined {
    const fieldControl = this.myForm.get(field);
    return fieldControl?.touched && fieldControl?.invalid;
  }

  passwordMatchValidator(form: AbstractControl) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
    // const {} = this.myForm.value;
  }
}
