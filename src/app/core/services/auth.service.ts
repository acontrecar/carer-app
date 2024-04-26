import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);

  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //!Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    console.log('DESDE EL CONSTRUCTOR DEL SERVICE');
    console.log({ authStatus: this.authStatus() });
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };
    // return this.http.post<LoginResponse>(url, body).pipe(
    //   map(({ user, token }) => this.setAuthentication(user, token)),

    //   catchError((err) => {
    //     console.log(err);
    //     return throwError(() => 'Algo no sucedio como lo esperaba');
    //   })
    // );

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      // map(() => true),

      tap(() => {
        // console.log(this.loggedIn.getValue());
      }),

      catchError((err) => {
        console.log(err);
        return throwError(() => 'Algo no sucedio como lo esperaba');
      })
    );
  }

  public checkStatus(): void {
    console.log(this.currentUser());
    console.log(this.authStatus());
  }

  public getStatus() {
    return this.authStatus();
  }

  public setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    this.loggedIn.next(true);

    console.log('DESDE EL SERVICE');
    console.log({ authStatus: this.authStatus() });
    // console.log({ currentUser: this.currentUser() });
    return true;
  }
}
