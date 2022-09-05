
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  success: boolean = false;
  fail: boolean = false;
  submited: boolean = false;
  loading: boolean = false;


  loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService
    ) { }
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['profile'])
    }
  }

  /**
   * On submit click atempt login
   */
  onSubmit() {
    this.loading = true;
    const username = this.loginFormGroup.value.username;
    const password = this.loginFormGroup.value.password;
    
    const Observable = this.authService.login(username, password)

    Observable.subscribe({
      next: (v) => {
        this.success = true;
        this.loading = false;

        // format role; ex: from "ROLE_ADMIN" to "admin"
        const roleArr: string = v.role.split('_');
        const role = roleArr[roleArr.length - 1].toLocaleLowerCase();

        // Set logged in status
        this.authService.setAuthenticated(true);
        this.authService.setUsername(username);
        this.authService.setRole(role);

        // Show success message for 2.5sec
        const contador = timer(2500);
        // Make submit button available again
        contador.subscribe(() => {this.success = false; this.submited = false})

        // Save login in sessionStorage
        window.sessionStorage.setItem("auth-token", v.token)

        // Save login username in sessionStorage
        if(username != null){
          window.sessionStorage.setItem("auth-username", username)
        }
        
        // Save role in sessionStorage
        window.sessionStorage.setItem("auth-role", role)

        // Redirect to home (TODO: show a successfuly message )
        this.router.navigate(['profile']);
      },
      error: (e) => {
        this.fail = true;
        this.loading = false;

        // Show fail message for 2.5sec
        const contador = timer(2500);
        contador.subscribe(() => this.fail = false)

        // Make submit button available again
        this.submited = false
        console.log(e)
      },
      complete: () => {
        console.log("complete!")
      }

    })
  }
}


