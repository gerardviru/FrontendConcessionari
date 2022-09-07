import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario/usuario.model';

const baseUrl = 'http://localhost:8181/api';

@Injectable({
  providedIn: 'root'
})
export class UsuariService {

  usuarilogin: any;
  
  constructor(private httpClient: HttpClient) { }

  getUsuarilogin(){

    return this.usuarilogin;
  }

  setUsuarilogin(usuari: any){

    this.usuarilogin = usuari
  }


  list(): Observable<any[]> {
    return this.httpClient.get<Usuario[]>(`${baseUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string){
    return this.httpClient.get<Usuario>(`${baseUrl}/${id}`).pipe(
      catchError(this.handleError));

  }
  getByUsername(username: string){
    return this.httpClient.get<Usuario>(`${baseUrl}/usuari/username/${username}`).pipe(
      catchError(this.handleError));
  }

  add(data: any){
    return this.httpClient.post<any>(`${baseUrl}`,data).pipe(catchError(this.handleError));
  }

  update(id: any,data: any){
    return this.httpClient.put<Usuario>(`${baseUrl}/${id}`,data).pipe(catchError(this.handleError));
  }

  delete(id:any){
    return this.httpClient.delete<Usuario>(`${baseUrl}/${id}`).pipe(catchError(this.handleError));
  }
    // Handle API errors
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.log('An error occurred:', error.error.message);
      } else {
        //console.log(`Backend returned code ${error.status}, ` +`body was: ${error.error}`);
        console.log(error.status);
        console.log(error);
        

      }
      return throwError(
        'Something bad happened; please try again later.');
    };


}
