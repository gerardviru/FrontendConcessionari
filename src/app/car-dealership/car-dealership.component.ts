import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provincia } from '../models/provincia/provincia.model';
import { ProvinciaService } from '../service/Provincia/provincia.service';

@Component({
  selector: 'app-car-dealership',
  templateUrl: './car-dealership.component.html',
  styleUrls: ['./car-dealership.component.css']
})

export class CarDealershipComponent implements OnInit {
  
  provincia: any;
  provinciaSelected = "";

  constructor(private router: Router, private provinciaService: ProvinciaService, ) { }

  ngOnInit(): void {

    this.provinciaService.list().subscribe({
      next: (result: Provincia) => {
      
        
        this.provincia = result;
        console.log(this.provincia);
      }
    })

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
