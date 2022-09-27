import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Concesionario } from '../models/Concesionario/concesionario.model';
import { Provincia } from '../models/provincia/provincia.model';
import { ConcessionariService } from '../service/Concessionari/concessionari.service';
import { ProvinciaService } from '../service/Provincia/provincia.service';

@Component({
  selector: 'app-car-dealership',
  templateUrl: './car-dealership.component.html',
  styleUrls: ['./car-dealership.component.css']
})

export class CarDealershipComponent implements OnInit {
  
  provincia: any
  provinciaSelected = ""

  myForm: FormGroup
  concesionario!: Concesionario
  newCon: any = {}

  constructor(private router: Router, private provinciaService: ProvinciaService, private concessionariService: ConcessionariService ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({

      idpk_con: new FormControl('', Validators.required),
      cif: new FormControl('', Validators.required), 
      nom: new FormControl('', Validators.required),
      telefon: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      provincia: new FormControl ('', Validators.required),
      codi_postal: new FormControl('', Validators.required),
      create_per: new FormControl('', Validators.required),
      actualitzat_per: new FormControl('', Validators.required),
      data_actualitzacio: new FormControl ('', Validators.required),

    })

    this.provinciaService.list().subscribe({
      next: (result: Provincia) => {
      
        
        this.provincia = result;
        console.log(this.provincia);
      }
    })
  }

  guardarDatos(){
    console.log(this.newCon);
    this.newCon.provincia = {

      "nom": this.provinciaSelected
    }
    
    this.concessionariService.add(this.newCon).subscribe ({
      next: (result: Concesionario) => {
      }
    })

    alert("Concesionario creado correctamente")
  }

  clear(){
    
  }

  back(){
    this.router.navigate(['/dealer']);
  }
}
