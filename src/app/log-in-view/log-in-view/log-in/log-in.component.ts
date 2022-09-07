
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

  Session: Session;

  sigInFail = false;

  submitted: boolean = false;

  // @Output() isSigned = new EventEmitter();

  constructor(private loginService: LoginService, private usuariService:UsuariService, private SessionService: SessionService, private rolService: RolService, private router: Router) {
    this.user = {
      username: 'gerard',
      password: 'password'
    }
    this.Session = {
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
          this.Session.token = result.token;
          this.SessionService.setToken(this.Session.token);
          this.Session.username = this.user.username;
          this.SessionService.setUsername(this.Session.username)
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
    this.usuariService.getByUsername(username).subscribe({
      next:(result: Usuario) =>{
        console.log(result);
        this.usuario = result;
        this.Session.rol = this.usuario.role;
        this.SessionService.setRol(this.Session.rol);
        this.sigInFail = false;
        this.submitted = true;
        console.log(this.usuario);
        console.log(" usuario");
        this.loginService.setUser(this.user);
        this.loginService.setUser$();
        console.log(Rol[this.usuario.role]);
        this.rolService.addRol(Rol[this.usuario.role]);
        console.log(Rol[this.usuario.role]);
        console.log("navigate");
        this.usuariService.setUsuarilogin(username);
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


  /**
   * On submit click atempt login
   */
  // onSubmit() {
  //   this.loading = true;
  //   const username = this.loginFormGroup.value.username;
  //   const password = this.loginFormGroup.value.password;

  //   this.authService.login('gerard', 'password').subscribe({
  //     next:(result: any) =>{
  //       this.success = true;
  //           this.loading = false;
    
  //           // format role; ex: from "ROLE_ADMIN" to "admin"
  //           // const roleArr: string = result.role.split('_');
  //           // const role = roleArr[roleArr.length - 1].toLocaleLowerCase();
    
  //           // Set logged in status
  //           this.authService.setAuthenticated(true);
  //           this.authService.setUsername(username);
  //           // this.authService.setRole(role);
    
  //           // Show success message for 2.5sec
  //           const contador = timer(2500);
  //           // Make submit button available again
  //           contador.subscribe(() => {this.success = false; this.submited = false})
    
  //           // Save login in sessionStorage
  //           window.sessionStorage.setItem("auth-token", result.token)
    
  //           // Save login username in sessionStorage
  //           if(username != null){
  //             window.sessionStorage.setItem("auth-username", username)
  //           }
            
  //           // Save role in sessionStorage
  //           // window.sessionStorage.setItem("auth-role", role)
    
  //           // Redirect to home (TODO: show a successfuly message )
  //           this.router.navigate(['profile']);
  //     },
  //     error:(error: Error) =>{
  //       console.log(error);
        
  //     }
  //   })


  //   // const Observable = this.authService.login(username, password)

  //   // Observable.subscribe({
  //   //   next: (v) => {
  //   //     this.success = true;
  //   //     this.loading = false;

  //   //     // format role; ex: from "ROLE_ADMIN" to "admin"
  //   //     const roleArr: string = v.role.split('_');
  //   //     const role = roleArr[roleArr.length - 1].toLocaleLowerCase();

  //   //     // Set logged in status
  //   //     this.authService.setAuthenticated(true);
  //   //     this.authService.setUsername(username);
  //   //     this.authService.setRole(role);

  //   //     // Show success message for 2.5sec
  //   //     const contador = timer(2500);
  //   //     // Make submit button available again
  //   //     contador.subscribe(() => {this.success = false; this.submited = false})

  //   //     // Save login in sessionStorage
  //   //     window.sessionStorage.setItem("auth-token", v.token)

  //   //     // Save login username in sessionStorage
  //   //     if(username != null){
  //   //       window.sessionStorage.setItem("auth-username", username)
  //   //     }
        
  //   //     // Save role in sessionStorage
  //   //     window.sessionStorage.setItem("auth-role", role)

  //   //     // Redirect to home (TODO: show a successfuly message )
  //   //     this.router.navigate(['profile']);
  //   //   },
  //   //   error: (e) => {
  //   //     this.fail = true;
  //   //     this.loading = false;

  //   //     // Show fail message for 2.5sec
  //   //     const contador = timer(2500);
  //   //     contador.subscribe(() => this.fail = false)

  //   //     // Make submit button available again
  //   //     this.submited = false
  //   //     console.log(e)
  //   //   },
  //   //   // complete: () => {
  //   //   //   console.log("complete!")
  //   //   // }

  //   // })
}



