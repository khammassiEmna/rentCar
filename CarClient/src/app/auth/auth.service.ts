import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8085/api/auth/signin';
  private signupUrl = 'http://localhost:8085/api/auth/signup';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    console.log("signUpForm", SignUpInfo)
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
  getAll(): Observable<any> {
    return this.http.get('http://localhost:8085/api/auth/all')
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8085/api/auth/delete/${id}`, { responseType: 'text' })
  }
  getByuserName(username: string): Observable<any> {
    return this.http.get(`http://localhost:8085/api/auth/${username}`)

  }
  passwordCheck(username: string, password: string): Observable<any> {

    return this.http.get(`http://localhost:8085/api/auth/passwordCheck/${username}/${password}`)

  }
  userUpdate(username: string, user: User): Observable<any> {

    return this.http.put(`http://localhost:8085/api/auth/${username}`, user)

  }
}