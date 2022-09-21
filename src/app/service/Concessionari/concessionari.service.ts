import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Concessionari } from 'src/app/models/enum/concessionari/concessionari.model';


const CONCESSIONARI = 'http://localhost:8181/api/concessionari'; 

@Injectable({
  providedIn: 'root'
})

export class ConcessionariService {

  constructor(private httpClient: HttpClient) { }

  listConcessionari():Observable<Concessionari>{
    return this.httpClient.get<any>(`${CONCESSIONARI}`).pipe
    (catchError(this.handleError));
  }

  getById(id: number){
    return this.httpClient.get<Concessionari>(`${CONCESSIONARI}/${id}`).pipe(
      catchError(this.handleError));
  }

  getConcesionario(idpk_con: number){
    return this.httpClient.get(`${CONCESSIONARI}/${idpk_con}`).pipe(
      catchError(this.handleError));

  }

  getItem(id: any): Observable<any> {
    return this.httpClient.get(`${CONCESSIONARI}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  update(id: any,data: any ){
    return this.httpClient.put<Concessionari>(`${CONCESSIONARI}/${id}`,data).pipe(catchError(this.handleError));
  }

      // Handle API errors
      handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.log('An error occurred:', error.error.message);
        } else {
         console.log(error.status);
        }
        return throwError(
          'Something bad happened; please try again later.');
      };
}
