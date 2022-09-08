import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario/usuario.model';
import { Persona } from '../models/Persona/persona.model';
import { UsuariService } from '../service/Usuario/usuari.service';
import { PersonaService } from '../service/Persona/persona.service';
import { LoginService } from '../service/Auth/Login/login.service';


@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.css']
})
export class ProfileSelectionComponent implements OnInit {

  user: any;
  usuario!: Usuario;
  persona!: Persona;
  

  constructor(private usuariService: UsuariService, private loginService: LoginService, private personaService: PersonaService,private router: Router) { 

  }

  ngOnInit(): void {
    this.loginService.getUser$().subscribe(user => {
      this.user = user;
    });

    this.user = this.loginService.getUser();
  
    // if (this.user != undefined) {
    //   this.getUsuario(this.user.username);
    // }
  }
  
  getUsuario(username: string){
    console.log(username);
    this.usuariService.getByUsername(username).subscribe({
      next:(result: Usuario) =>{
        this.usuario = result;

        this.getUsuario(this.usuariService.getUsuarilogin());
        console.log(username);
        
      },
      error:(error: any) =>{
        console.log(error + ' Error rol sesion user' );
      }
    });
  
    }

    onSubmit(): void {
      this.router.navigate (["/dealer"])
  }
}

