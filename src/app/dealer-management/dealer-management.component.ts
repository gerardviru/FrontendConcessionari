import { Component, OnInit } from '@angular/core';
import { ConcessionariService } from '../service/Concessionari/concessionari.service';
import { LoginService } from '../service/Auth/Login/login.service';
import { UsuariService } from '../service/Usuario/usuari.service';
import { Concessionari } from '../models/enum/concessionari/concessionari.model';

@Component({
  selector: 'app-dealer-management',
  templateUrl: './dealer-management.component.html',
  styleUrls: ['./dealer-management.component.css']
})
export class DealerManagementComponent implements OnInit {

  id: any;
  concesionario!: Concessionari
  datoConcesionario: any = {"idpk_con":"", "cif": "", "nom": "", "telefon":"","email":"", "provincia": "", "codi_postal": "", "create_per":"", "actualitzat_per":"", "data_actualitzacio": ""};
  user: any;
  
  constructor(private concessionariService: ConcessionariService, private loginService: LoginService, private usuariService: UsuariService ) { }

  getInputValue(inputValue:string){
    console.log(inputValue);
    
    let idN = Number(inputValue);
    console.log(idN);
    
    this.concessionariService.getById(idN).subscribe({
      next:(result: Concessionari) =>{
        this.concesionario = result;
      }
    })
  }


  // cleanValue(idN: number){
  //   if(idN != 1 && 11){

  //   }

  ngOnInit(): void {
    this.getInputValue;  
  }
}
