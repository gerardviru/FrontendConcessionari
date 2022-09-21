import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConcessionariService } from '../service/Concessionari/concessionari.service';
import { LoginService } from '../service/Auth/Login/login.service';
import { UsuariService } from '../service/Usuario/usuari.service';
import { Concessionari } from '../models/enum/concessionari/concessionari.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ProvinciaService } from '../service/Provincia/provincia.service';
import { Provincia } from '../models/provincia/provincia.model';

@Component({
  selector: 'app-dealer-management',
  templateUrl: './dealer-management.component.html',
  styleUrls: ['./dealer-management.component.css']
})
export class DealerManagementComponent implements OnInit {

  
  disabled: boolean = true;

  id: any;
  provincia: any;
  provinciaSelected: any;
  concesionario!: Concessionari
  datoConcesionario: any = {"idpk_con":"", "cif": "", "nom": "", "telefon":"","email":"", "provincia": "", "codi_postal": "", "create_per":"", "actualitzat_per":"", "data_actualitzacio": ""};
  user: any;
  idN: any;
  nconcesionario: any = {} ;
  myForm: FormGroup;

  constructor(private concessionariService: ConcessionariService, private loginService: LoginService, private usuariService: UsuariService, private provinciaService: ProvinciaService, private router: Router ) { }

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

    this.provinciaService.list().subscribe({
      next: (result: Provincia) => {
      
        
        this.provincia = result;
        console.log(this.provincia);
      }
    })
  }


  getInputValue(inputValue:string){
    console.log(inputValue);
   
    
    
    this.idN = Number(inputValue);
    console.log(this.idN);
    console.log(this.nconcesionario)
    
    this.concessionariService.getById(this.idN).subscribe({
      next:(result: Concessionari) =>{
        this.concesionario = result;
      }
    })
    this.concesionario = this.nconcesionario;
  }
  
  redirect(){
    this.router.navigate(['/concesionario']);
  }

  back(){
    this.router.navigate(['/menu']);
  }

  update(){
    this.disabled = !this.disabled;

    console.log(this.nconcesionario);
  
    this.concessionariService.update(this.idN,this.nconcesionario).subscribe({
      next:(result: Concessionari) =>{
        this.nconcesionario = result;
        console.log("result");
        console.log(result);
      }
    })
      console.log(this.nconcesionario);
      
    
    
  }
}
