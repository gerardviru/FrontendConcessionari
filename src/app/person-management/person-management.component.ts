import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Persona } from '../models/Persona/persona.model';
import { PersonaService } from '../service/Persona/persona.service';


@Component({
  selector: 'app-person-management',
  templateUrl: './person-management.component.html',
  styleUrls: ['./person-management.component.css']
})
export class PersonManagementComponent implements OnInit {

  disabled: boolean = true;
  provincia: any
  id: any;
  persona!: Persona
  datoPersona: any = {"idpk_persona":"", "nif": "", "nom": "", "cognom1":"","cognom2":"", "telefon": "", "email": "", "adreca":"", "idfk_prov":"", "codi_postal":"", "actualitzat_per":"", "data_actualitzacio": ""};
  user: any;
  idN: any;

  myForm: FormGroup;

  constructor(private personaService: PersonaService, private router: Router ) { }

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
  }

  getInputValue(NomPer:string){
    console.log(NomPer);
    
    this.personaService.getByNom(NomPer).subscribe({
      next:(result: Persona) =>{
        this.persona = result;
        console.log(this.persona);
      }
    })
  }
  
  redirect(){
    this.router.navigate(['/concesionario']);
  }

  Update(){
      
  }

  back(){
    this.router.navigate(['/menu']);
  }

  newPerson(){
    this.router.navigate(['/person']);
  }

  DeletePer(){

  }

  
}




 
