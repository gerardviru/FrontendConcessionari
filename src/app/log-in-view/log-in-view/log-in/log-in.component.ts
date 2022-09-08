
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
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user!: any;

  role: any;

  usuario!: Usuario;

  session: Session;

  sigInFail = false;

  submitted: boolean = false;

  // @Output() isSigned = new EventEmitter();

  constructor(private loginService: LoginService, private usuarioService:UsuariService, private sessionService: SessionService, private rolService: RolService, private router: Router) {
    this.user = {
      username: 'gerard',
      password: 'password'
    }
    this.session = {
      username: '',
      token: '',
      rol: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("Se ha pulsado el botón");

    this.loginService.login(this.user)
    .subscribe(
      {
        next: (result: Token) => {
          this.session.token = result.token;
          this.sessionService.setToken(this.session.token);
          this.session.username = this.user.username;
          this.sessionService.setUsername(this.session.username)
          this.getUsuario(this.user.username);


        },
        error: (resultError: Error) => {
         this.sigInFail = true;
          console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
        }
      }
    )

  }

  getUsuario(username: string){
    console.log(username + " gerUsuario");
    this.usuarioService.getByUsername(username).subscribe({
      next:(result: Usuario) =>{
        console.log(result);
        this.usuario = result;
        this.session.rol = this.usuario.rol;
        this.sessionService.setRol(this.session.rol);
        this.sigInFail = false;
        this.submitted = true;
        console.log(this.usuario);
        console.log(" usuario");
        this.loginService.setUser(this.user);
        this.loginService.setUser$();
        console.log(Rol[this.usuario.rol]);
        this.rolService.addRol(Rol[this.usuario.rol]);
        console.log(Rol[this.usuario.rol]);
        this.router.navigate(['/profile']);
        // this.isSigned.emit(this.submitted);

      },
      error:(error: any) =>{
        console.log(error + ' Error rol sesion user' );
      }
    });

  }

  registrar(){
    this.router.navigate(['/signup']);
  }

}



