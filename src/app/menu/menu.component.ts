import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  gestionConcesionario(){
    this.router.navigate(['/dealer']);
  }

  newConcesionario(){
    this.router.navigate(['/concesionario']);
  }

  gestionPersona(){
    this.router.navigate(['/management-person']);
  }

  newPersona(){
    this.router.navigate(['/person']);
  }
}
