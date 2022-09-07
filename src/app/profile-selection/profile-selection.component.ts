import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario/usuario.model';
import { LoginService } from '../service/Auth/Login/login.service';
import { SessionService } from '../service/Auth/SessionStorage/session.service';
import { UsuariService } from '../service/Usuario/usuari.service';


@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.css']
})
export class ProfileSelectionComponent implements OnInit {

  user: any;
  usuario!: Usuario;
  router: any;

  constructor(private usuariService: UsuariService, private loginService: LoginService, private sessionService: SessionService) { 

  }

  ngOnInit(): void {
    console.log(this.usuariService.getUsuarilogin());
    this.loginService.getUser$().subscribe(user => {
      this.user = user;
    });

    this.user = this.loginService.getUser();

    if (this.user != undefined) {
      this.getUsuario(this.user.username);

    } else {
      this.router.navigate(['']);
    }
  }
  
  getUsuario(username: string){
    console.log(username + " gerUsuario");
    this.usuariService.getByUsername(username).subscribe({
      next:(result: Usuario) =>{
        this.usuario = result;

        this.getUsuario(this.usuariService.getUsuarilogin());
      },
      error:(error: any) =>{
        console.log(error + ' Error rol sesion user' );
      }
    });
  
    }
}

