import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Persona } from '../../models/Persona/persona.model';


const baseUrl = 'http://localhost:8181/api';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  DatosPersona: any;

  constructor(private httpClient: HttpClient) { }

  getDatosPersona(){
    return this.DatosPersona;
  }

  setDatosPersona(nom: any, cognom1: any, cognom2: any){

    this.DatosPersona = nom, cognom1, cognom2;
  }

  list(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/persona`).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number){
    return this.httpClient.get<Persona>(`${baseUrl}/persona/${id}`).pipe(
      catchError(this.handleError));

  }

  getByNom(nom: string){
    return this.httpClient.get<Persona>(`${baseUrl}/persona/nom/${nom}`).pipe(
      catchError(this.handleError));
  }

  add(data: any){
    return this.httpClient.post<any>(`${baseUrl}/persona`,data).pipe(catchError(this.handleError));
  }

  update(id: any,data: any ){
    return this.httpClient.put<Persona>(`${baseUrl}/persona/${id}`,data).pipe(catchError(this.handleError));
  }

  delete(id: number){
    return this.httpClient.delete<Persona>(`${baseUrl}/persona/${id}`).pipe(catchError(this.handleError));
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
