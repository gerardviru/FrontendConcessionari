import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = "http://localhost:8181/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean = false;
  username : string | undefined;
  role: string | null = null;

  constructor(private httpCliente: HttpClient) {
    const sessionUsername = window.sessionStorage.getItem("auth-username")
    if (sessionUsername) {
      this.username = sessionUsername;
      this.isAuth = true;
      this.role = window.sessionStorage.getItem("auth-role");
    }
  }

  /**
   * Login endpoint
   * @param username
   * @param password
   * @returns
   */
  login(username: string | null | undefined, password: string | null | undefined): Observable<any> {
    return this.httpCliente.post(AUTH_API + 'login', {
      username: username,
      password: password
    });

  }

  /**
   * Logout user, erase sessionStorage
   */
  logout() {
    this.isAuth = false;
    this.username = undefined;
    window.sessionStorage.clear()

  }

  /**
   * Register endpoint
   * @param username
   * @param password
   * @param email
   * @returns
   */
  register(username: string, password: string, email: string): Observable<any> {
    return this.httpCliente.post(AUTH_API + 'signup', {
      username: username,
      password: password,
      email: email
    });
  }

  /**
   * Check user authentication status
   */
  isAuthenticated(): boolean {
    return this.isAuth;
  }

  /**
   * Set user authentication status
   */
  setAuthenticated(auth: boolean) {
    this.isAuth = auth;
  }

  // Setter getter username
  setUsername(username: string | null | undefined) {
    if(username!= null){
      this.username = username;
    } 
  }

  getUsername() {
    return this.username;
  }

  // Setter getter role
  getRole() {
    return this.role;
  }

  setRole(role: string) {
    this.role = role;
  }
}
