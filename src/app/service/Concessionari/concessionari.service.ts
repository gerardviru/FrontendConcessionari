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

  

  // add(data:any){
  //   return this.httpClient.post<Concessionari>(`${concessionari}`,data).pipe(catchError(this.handleError));
  // }

  // buscarPropietarioLibro(idUsuario:any){
  //   const usuarioId = {
  //     id:idUsuario.id
  //   }
  //   return this.httpClient.post<any>(`${concessionari}/usuario`,usuarioId).pipe(catchError(this.handleError));
  // }

  // update(id: any,data: Concessionari){
  //   const updateconcessionari = {
  //     id: data.id,
  //     cif: data.cif,
  //     nom: data.nom,
  //     telefon: data.telefon,
  //     email: data.email,
  //     adreça: data.adreça,
  //     codi_postal: data.codi_postal,
  //     creat_per: data.creat_per,
  //     data_creacio:data.data_creacio,
  //     actualitzat_per:data.actualitzat_per,
  //     data_actualitzacio:data.data_actualitzacio,
  //     provincia: {
  //       id:data.provincia.id,
  //       codi_prov:data.provincia.codi_prov,
  //       create_per:data.creat_per,
  //       data_creacio:data.data_creacio,
  //       actualitzat_per:data.actualitzat_per,
  //       data_actualitzacio:data.data_actualitzacio,
  //     }
  //   };


  //   return this.httpClient.put<Concessionari>(`${concessionari}/${id}`,updateconcessionari).pipe(catchError(this.handleError));
  // }

  // delete(id:any){
  //   return this.httpClient.delete<Concessionari>(`${concessionari}/${id}`).pipe(catchError(this.handleError));
  // }

      // Handle API errors
      handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.log('An error occurred:', error.error.message);
        } else {
         // console.log(          `Backend returned code ${error.status}, ` +`body was: ${error.error}`);
         console.log(error.status);
        }
        return throwError(
          'Something bad happened; please try again later.');
      };
}
