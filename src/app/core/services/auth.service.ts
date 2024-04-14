import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //!Al mundo exterior
  public currentUser = computed(() => this._currentUser);
  public authStatus = computed(() => this._authStatus);

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };
    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        const current = this.authStatus();
        console.log(current());
      }),

      map(() => true),

      catchError((err) => {
        console.log(err);
        return throwError(() => 'Algo no sucedio como lo esperaba');
      })
    );
  }
}
