import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AutoDestroyService } from '../../../core/services/auto-destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService, AutoDestroyService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  // INJECTS
  private fb: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private autoDestroyService = inject(AutoDestroyService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email: ['antonio@google.com', [Validators.required, Validators.email]],
    password: ['Abc123', Validators.required],
  });
  public isCorrectUser = signal<boolean>(true);

  onSubmit(): void {
    if (this.myForm.invalid) return;

    const { email, password } = this.myForm.value;

    this.authService
      .login(email, password)
      .pipe(takeUntil(this.autoDestroyService))
      .subscribe({
        next: () => {
          console.log('Bien');
          this.isCorrectUser.set(true);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          // alert(error.error.message);
          this.isCorrectUser.set(false);
          console.log(this.isCorrectUser());
        },
      });
  }
}
