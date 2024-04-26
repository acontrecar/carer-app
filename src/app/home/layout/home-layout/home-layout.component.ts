import {
  Component,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { JsonPipe } from '@angular/common';
import { User } from '../../../core/interfaces';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export class HomeLayoutComponent {
  // public authService = inject(AuthService);
  // public user: WritableSignal<User | null> = signal<User | null>(null);
  // constructor() {
  //   this.user.set(this.authService._currentUser() as User);
  //   console.log(this.user());
  // }
}
