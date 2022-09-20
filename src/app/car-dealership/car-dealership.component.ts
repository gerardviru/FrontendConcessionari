import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-dealership',
  templateUrl: './car-dealership.component.html',
  styleUrls: ['./car-dealership.component.css']
})
export class CarDealershipComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.guardarDatos;
    this.Cancelar;

  }

  guardarDatos(){
    const input = document.getElementById('form') as HTMLInputElement | null;

    if (input != null) {
    const value = input.value;
    console.log(value);  
    }
  }

  clear(){
    
  }

  Cancelar(){
    this.router.navigate(['/dealer']);
  }

}
