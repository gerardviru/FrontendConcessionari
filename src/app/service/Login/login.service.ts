import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { token } from 'src/app/models/token/token.model';
import { usuario } from 'src/app/models/usuario/usuario.model'

const baseUrl = "http://localhost:8181/"

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private user!: any;
  private user$!: Subject<any>;

  constructor(private httpClient: HttpClient) {
    this.user$ = new Subject();
  }

  login(usuario: any): Observable<token> {
    return this.httpClient.post<token>(`${baseUrl}login`, usuario).pipe(
      catchError(this.handleError)
    );
  }

  getByName(username: string): Observable<usuario> {
    return this.httpClient.get<usuario>(`${baseUrl}usuario/username${username}`).pipe(
      catchError(this.handleError)
    );
  }

  add(user: usuario): Observable<usuario> {
    return this.httpClient.post<usuario>(`${baseUrl}usuario/`, user).pipe(
      catchError(this.handleError)
    );
  }
   // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  getUser$(): Observable<any>{
    return this.user$.asObservable();
  }

  setUser$(){
    this.user$.next(this.user);
  }


  setUser(usuario: any) {
    this.user = usuario;
  }

  getUser(): any {
    return this.user;
  }
}
