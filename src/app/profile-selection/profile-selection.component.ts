import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario/usuario.model';
import { Persona } from '../models/Persona/persona.model';
import { UsuariService } from '../service/Usuario/usuari.service';
import { PersonaService } from '../service/Persona/persona.service';
import { LoginService } from '../service/Auth/Login/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.css']
})
export class ProfileSelectionComponent implements OnInit {

  user: any;
  usuario!: Usuario;
  persona!: Persona;
  datousuario: any = {"id":"", "username": "", "email": "", "password":"","rol":"", "intents": "", "bloquejat": "", "create_per":"", "actualitzat_per":"", "data_actualitzacio": "", "persona": ""};

  userForm = new FormGroup({
    profile: new FormControl('', Validators.required),
    check: new FormControl('', Validators.requiredTrue),
  });

  constructor(private usuariService: UsuariService, private loginService: LoginService, private personaService: PersonaService,private router: Router) { 

  }

  ngOnInit(): void {
    this.loginService.getUser$().subscribe(
      user => { this.user = user;
    });

    this.user = this.loginService.getUser();

    if (this.user != undefined) {
      this.getUsuario(this.user.username);

    } else {
      this.router.navigate(['/']);
    } 

  }
  
  getUsuario(username: string){
    console.log(username);
    this.usuariService.getByUsername(username).subscribe({
      next:(result: Usuario) =>{
        this.usuario = result;
      }
    });
  }

    onSubmit(): void {
      this.router.navigate (["/dealer"])
  }
}

