import { Component, OnInit } from '@angular/core';
import { ConcessionariService } from '../service/Concessionari/concessionari.service';
import { Concesionari } from '../models/Concesionario/concesionario.model';

@Component({
  selector: 'app-dealer-management',
  templateUrl: './dealer-management.component.html',
  styleUrls: ['./dealer-management.component.css']
})
export class DealerManagementComponent implements OnInit {

  concesionario!: Concesionari
  datosConcesionario: any = {"id":"", "cif": "", "nom": "", "telefon":"","email":"", "idfk_prov": "", "codi_postal": "", "create_per":"", "actualitzat_per":"", "data_actualitzacio": ""};
  constructor(private concessionariService: ConcessionariService ) { }

  ngOnInit(): void {
    
    this.concessionariService.listConcessionari().subscribe({
      next:(result:any)=>{
        console.log(result); 
        result = this.concesionario;
        this.concessionariService.getItem(this.concesionario).subscribe(
          datosConcesionario => { this.datosConcesionario = datosConcesionario
            console.log(datosConcesionario);
            
          }
        )
      },
      error:(error:Error)=>{
        console.log(Error);
      }
    });
  }

}
