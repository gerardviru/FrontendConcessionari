import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const baseUrl = 'http://localhost:8181/api';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/provincia`).pipe(
      catchError(this.handleError)
    );
  }



  
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
