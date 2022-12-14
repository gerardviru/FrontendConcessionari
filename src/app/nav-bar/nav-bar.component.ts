import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/Auth/auth/auth.service';
import { SessionService } from '../service/Auth/SessionStorage/session.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isAuth: boolean = false;
  username: string | undefined;
  role: string | undefined | null;

  dataBuscar: any;
  libro: any;
  durationInSeconds: number = 5;
  constructor( private router: Router, private sesionService: SessionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {

      this.isAuth = this.authService.isAuthenticated()
      if (this.authService.getUsername()) {
        this.username = this.authService.getUsername();
        this.role = this.authService.getRole();
      }

    })
  }

  logOut() {
    this.authService.logout();
    this.isAuth = false;
    this.username = undefined;
    this.router.navigate(['/'])
  }
}
