import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Token } from 'src/app/models/Token/token.model';
import { Usuario } from 'src/app/models/Usuario/usuario.model'

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

  login(Usuario: any): Observable<Token> {
    console.log("login");
    return this.httpClient.post<Token>(`${baseUrl}login`, Usuario).pipe(
      catchError(this.handleError)
    );
  }

  getByName(username: string): Observable<Usuario>{
    console.log("getByName");
    return this.httpClient.get<Usuario>(`${baseUrl}api/usuari/username/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  add(user: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${baseUrl}Usuario/`, user).pipe(
      catchError(this.handleError)
    );
  }
   // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(error.status);
      
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


  setUser(Usuario: any) {
    this.user = Usuario;
  }

  getUser(): any {
    return this.user;
  }
}
