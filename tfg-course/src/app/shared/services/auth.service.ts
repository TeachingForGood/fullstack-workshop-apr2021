import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData, LoginData, SignupData } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private authStatusListener = new EventEmitter<boolean>();
  private tokenTimer?: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Attempt to log the user in.
   */
   login(data: LoginData): void {
    this.http.post<AuthData>(`${environment.apiUrl}/v2/user/login`, data).subscribe(
      (res) => this.loginSetup(res)
    );
  }

  /**
   * Signup a new user.
   */
  signup(data: SignupData): void {
    this.http.post<AuthData>(`${environment.apiUrl}/v2/user/signup`, data).subscribe(
      (res) => this.loginSetup(res)
    );
  }

  /**
   * Returns an observable that emits changes to the user's authentication status.
   */
  authStatusChanges(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  /**
   * Handle a successful login or signup and authenticate the user.
   */
  private loginSetup(data: AuthData): void {
    // set AuthData in localStorage
    localStorage.setItem('token', data.token);

    // set a Date object to 'now' + data.expiresIn seconds
    const expirationDate = new Date((new Date()).getTime() + data.expiresIn * 1000);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', data.username);

    // set a logout timer using data.expiresIn
    this.setAuthTimer(data.expiresIn);

    // redirect the user back to the home page after successful login
    this.router.navigate(['/']);
  }

  /**
   * Checks if the user has a valid token in localStorage, and sets auth status accordingly.
   */
  autoAuthUser() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      // missing data, treat user as NOT authenticated
      this.isAuthenticated = false;
      this.authStatusListener.emit(false);
      return;
    }
    // calculate whether expiration date is in the future or not
    const now = new Date();
    const expiresIn = (new Date(expirationDate)).getTime() - now.getTime();
    if (expiresIn > 0) {
      // expiration date is in the future, treat user as authenticated
      this.isAuthenticated = true;
      this.authStatusListener.emit(true);
      // set a logout timer
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  /**
   * Clear any existing authentication data and set auth status accordingly.
   */
  logout() {
    // remove data stored in localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    // set isAuthenticated to false and notify subscribers
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
  }

  /**
   * Set a timer to automatically logout when token expires.
   * @param duration - Timer duration in seconds
   */
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


}


