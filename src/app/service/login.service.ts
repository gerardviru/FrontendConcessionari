import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const baseUrl = "http://localhost:8181/"

export interface User {
  username: string | undefined,
  password: string | undefined,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user: any;
  private user$: Subject<any>

  constructor(private http: HttpClient) {
    this.user$ = new Subject();
  }

  signup(data: any) {
    this.user = data; //username, password - data
    this.user$.next(this.user)
    return this.http.post(`${baseUrl}/login`, data);
  }

  getByName(name: string): Observable<any> {
    return this.http.get(`${baseUrl}/users/${name}`)
  }

  add(data: any) {
    return this.http.post(`${baseUrl}/users/`, data)
  }

  getUser$(): Observable<any> {
    this.user$.asObservable().subscribe((v) => console.log(v));

    return this.user$.asObservable();
  }
}
