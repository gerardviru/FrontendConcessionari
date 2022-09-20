import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcessionariService } from '../service/Concessionari/concessionari.service';
import { LoginService } from '../service/Auth/Login/login.service';
import { UsuariService } from '../service/Usuario/usuari.service';
import { Concessionari } from '../models/enum/concessionari/concessionari.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dealer-management',
  templateUrl: './dealer-management.component.html',
  styleUrls: ['./dealer-management.component.css']
})
export class DealerManagementComponent implements OnInit {

  disabled: boolean = true;

  id: any;
  concesionario!: Concessionari
  datoConcesionario: any = {"idpk_con":"", "cif": "", "nom": "", "telefon":"","email":"", "provincia": "", "codi_postal": "", "create_per":"", "actualitzat_per":"", "data_actualitzacio": ""};
  user: any;
  idN: any;
  newvalue: {} ;
  myForm: FormGroup;

  constructor(private concessionariService: ConcessionariService, private loginService: LoginService, private usuariService: UsuariService, private router: Router ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({

      idpk_con: new FormControl(""),
      cif: new FormControl(""), 
      nom: new FormControl(""),
      telefon: new FormControl(""),
      email: new FormControl(""),
      provincia: new FormControl (""),
      codi_postal: new FormControl(""),
      create_per: new FormControl(""),
      actualitzat_per: new FormControl(""),
      data_actualitzacio: new FormControl (""),

    })
    this.getInputValue; 
    this.redirect;
  }


  getInputValue(inputValue:string){
    console.log(inputValue);
    
    this.idN = Number(inputValue);
    console.log(this.idN);
    
    this.concessionariService.getById(this.idN).subscribe({
      next:(result: Concessionari) =>{
        this.concesionario = result;
      }
    })
  }
  
  redirect(){
    this.router.navigate(['/concesionario']);
  }

  back(){
    this.router.navigate(['/menu']);
  }

  Update(){
    this.disabled = !this.disabled;
  }
}
