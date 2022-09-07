import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>) {
    const token = window.sessionStorage.getItem("auth-token");
     console.log(token, ' token');
    if (token != null) {
      request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      console.log(request.headers.getAll(TOKEN_HEADER_KEY) + " petición");
      console.log(request.url + " petición");
      return request;
    }
  

  // Intercepta los requests y les añade el header con el token
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   let authReq = req;
  //   const token = window.sessionStorage.getItem("auth-token");
  //   console.log(token);
  //   if (token != null) {
  //     authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  //   }
  //   return next.handle(authReq);
  // }
  return request;
  }
}

// export const authInterceptorProvider =
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
