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
