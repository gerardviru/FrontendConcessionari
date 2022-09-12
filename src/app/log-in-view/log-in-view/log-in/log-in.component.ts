import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Token } from 'src/app/models/Token/token.model';
import { LoginService } from 'src/app/service/Auth/Login/login.service';
import { RolService } from 'src/app/service/Auth/Rol/rol.service';
import { SessionService } from 'src/app/service/Auth/SessionStorage/session.service';
import { Usuario } from 'src/app/models/Usuario/usuario.model';
import { Session } from 'src/app/models/session/session.model';
import { UsuariService } from 'src/app/service/Usuario/usuari.service';
import { Rol } from 'src/app/models/enum/Rol/rol.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  user!: any;

  role: any;

  guess: any;

  userlog: any;

  passlog: any;

  usuario!: Usuario;

  session: Session;

  isGuess = false;

  sigInFail = false;

  submitted: boolean = false;

  // @Output() isSigned = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuariService,
    private sessionService: SessionService,
    private rolService: RolService,
    private router: Router
  ) {
    this.user = {
      username: '',
      password: '',
    };
    this.session = {
      username: '',
      token: '',
      rol: '',
    };
  }

  ngOnInit(): void {}

  onSubmit(): void {
    //click button login
    console.log('Se ha pulsado el botón');
    //inputs valors credencials
    this.user = {
      username: this.userlog,
      password: this.passlog,
    };
    this.login(this.user);
  }

  login(user: any) {
    this.loginService.login(user).subscribe({
      //comprobacions
      next: (result: Token) => {
        this.session.token = result.token;
        this.sessionService.setToken(this.session.token);
        this.session.username = this.user.username;
        this.sessionService.setUsername(this.session.username);
        this.getUsuario(this.user.username);
      },
      error: (resultError: Error) => {
        this.sigInFail = true;
        this.isGuess = true;
        this.guess = {
          username: 'guess',
          password: 'password',
        };
        this.login(this.guess);
        console.log(
          `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
        );
      },
    });
  }

  getUsuario(username: string) {
    console.log(username + ' gerUsuario');
    this.usuarioService.getByUsername(username).subscribe({
      next: (result: Usuario) => {
        console.log(result);
        this.usuario = result;
        if (this.usuario.bloquejat !== 'Y') {
          this.session.rol = this.usuario.rol;
          this.sessionService.setRol(this.session.rol);
          this.sigInFail = false;
          this.submitted = true;
          console.log(this.usuario);
          console.log(' usuario');
          this.loginService.setUser(this.user);
          this.loginService.setUser$();
          console.log(Rol[this.usuario.rol]);
          this.rolService.addRol(Rol[this.usuario.rol]);
          let datosUpdate;

          if (this.isGuess == false) {
            this.router.navigate(['/profile']);
          } else {
            this.usuario.intents;
            console.log(this.usuario.intents + 'intents');
            if (this.usuario.intents == 0) {
              datosUpdate = {
                intents: '1',
                bloquejat: 'N',
              };
            }
            if (this.usuario.intents == 1) {
              datosUpdate = {
                intents: '2',
                bloquejat: 'N',
              };
            }
            if (this.usuario.intents == 2) {
              datosUpdate = {
                intents: '3',
                bloquejat: 'Y',
              };
            }

            this.updateIntents(this.usuario.idpk_usuari, datosUpdate);
            console.log(datosUpdate);
          }
        }else{
          console.log("cuenta block");
          
        }
      },

      error: (error: any) => {
        console.log(error + ' Error rol sesion user');
      },
    });
  }
  updateIntents(id: any, data: any) {
    this.usuarioService.update(id, data).subscribe({
      next: (datos: Usuario) => {
        console.log('update succesfull');
        datos.intents;
        console.log(datos.intents);
      },
      error: (error: any) => {
        console.log(error + 'Error');
      },
    });
  }

  registrar() {
    this.router.navigate(['/signup']);
  }
}
