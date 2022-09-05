import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectMessageService {

  message: string | undefined;
  observable: Observable<string> = new Observable((observer) => {

    // Mostrar el mensaje durante 3 sec luego eliminarlo
    observer.next(this.message);
    setTimeout(() => {
      observer.next(this.message = undefined)
    }, 2500);
  })

  constructor() { }

  setMessage(message: string) {
    this.message = message;
  }

  unsetMessage() {
    this.message = undefined;
  }

  getMessage() {
    return this.message;
  }



}
