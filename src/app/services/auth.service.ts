import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../shared/models/LoginModel';
import { IUser } from '../shared/models/User';
import { SessionStorageService } from '../shared/session-storage.service';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginObj: LoginModel) {
    return this.http.post<IUser>(`${environment.SERVER_API}/account/login`, loginObj);
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  isLoggedIn(): boolean {
    let user = this.getUser();
    return  (user && (Object.keys(user).length !== 0));
  }
}
