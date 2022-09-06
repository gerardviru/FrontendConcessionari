import { Injectable } from '@angular/core';
import { Sessionkeys } from 'src/app/models/enum/sessionkeys/Sessionkeys.model';
import { Session } from 'src/app/models/session/session.model';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  signOut(): void{
    window.sessionStorage.clear();
  }

  public saveSession(session: Session){
    window.sessionStorage.setItem(Sessionkeys.token, session.token);
    window.sessionStorage.setItem(Sessionkeys.rol, session.rol);
    window.sessionStorage.setItem(Sessionkeys.username, session.username);
  }

  public getSession(): any {
    const session = {
      username: window.sessionStorage.getItem(Sessionkeys.username),
      token: window.sessionStorage.getItem(Sessionkeys.token),
      rol: window.sessionStorage.getItem(Sessionkeys.rol),
    }
    return session;
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(Sessionkeys.token);
  }
  public getUsername(): string | null {
    return window.sessionStorage.getItem(Sessionkeys.username);
  }
  public getRol(): string | null {
    return window.sessionStorage.getItem(Sessionkeys.rol);
  }

  public setToken(token: string): void {
    window.sessionStorage.setItem(Sessionkeys.token, token);
  }
  public setUsername(username: string): void {
    window.sessionStorage.setItem(Sessionkeys.username, username);
  }
  public setRol(rol: string): void {
    window.sessionStorage.setItem(Sessionkeys.rol, rol);
  }
}
