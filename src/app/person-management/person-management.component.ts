import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../models/Persona/persona.model';
import { PersonaService } from '../service/Persona/persona.service';
import { ProvinciaService } from '../service/Provincia/provincia.service';
import { Provincia } from '../models/provincia/provincia.model';
import { ConcessionariService } from '../service/Concessionari/concessionari.service';
import { Concessionari } from '../models/enum/concessionari/concessionari.model';


@Component({
  selector: 'app-person-management',
  templateUrl: './person-management.component.html',
  styleUrls: ['./person-management.component.css']
})
export class PersonManagementComponent implements OnInit {

  disabled: boolean = true;
  provin: any
  listCon: any
  conSelected: any
  id: any;
  persona!: Persona
  datoPersona: any = {"idpk_persona":"", "nif": "", "nom": "", "cognom1":"","cognom2":"", "telefon": "", "email": "", "adreca":"", "idfk_prov":"", "codi_postal":"", "actualitzat_per":"", "data_actualitzacio": ""};
  user: any;
  idN: any;
  novaPersona: any = {}
  provinciaSelected:  any
  listIdProvConc: Provincia;
  

  myForm: FormGroup;
  

  constructor(private personaService: PersonaService,private concesionarioService: ConcessionariService, private provinciaService: ProvinciaService, private router: Router ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({

      idpk_persona: new FormControl('' ,Validators.required),
      nif: new FormControl('' ,Validators.required), 
      nom: new FormControl('' ,Validators.required),
      telefon: new FormControl('' ,Validators.required),
      email: new FormControl('' ,Validators.required),
      provincia: new FormControl ('' ,Validators.required),
      

    })

    this.provinciaService.list().subscribe({
      next: (result: Provincia) => {
        this.provin = result;
        console.log(this.provin);
      }
    })

    this.concesionarioService.listConcessionari().subscribe({
      next:(result: Concessionari) => {
        this.listCon = result
        console.log(this.listCon)
      }
    })

    this.provinciaService.list().subscribe({
      next: (result: Provincia) => {
        this.listIdProvConc = result
        console.log(this.listIdProvConc)
      }
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

  update(){
    
    this.disabled = !this.disabled;
    console.log("valor persona")
    console.log(this.novaPersona)
    console.log('selected')
    console.log(this.provinciaSelected)
    
    this.novaPersona.provincia = {

      "nom": this.provinciaSelected
    }

    this.novaPersona.concessionari = {
      "concesionario": this.conSelected
    }
    
    this.personaService.update(this.persona.idpk_persona,this.novaPersona).subscribe({
      next:(result: Persona) =>{
        console.log("result")
        console.log(result)
      }
    })
    console.log(this.novaPersona)
    alert("Datos personales actualizados")
  }

  get idpk_persona(): any { return this.myForm.get('idkp_persona')}
  get nif(): any { return this.myForm.get('nif')}
  get nom(): any{ return this.myForm.get('nom')}
  get telefon(): any{ return this.myForm.get('telefon')}
  get email(): any{ return this.myForm.get('email')}
  get provincia(): any { return this.myForm.get('provincia')}
  resetForm() { this.myForm.setValue({idpk_persona:'', nif:'', nom:'', telefon:'', email:'', provincia:''}); }

  
  back(){
    this.router.navigate(['/menu']);
  }

  newPerson(){
    this.router.navigate(['/person']);
  }

  DeletePer(){

    console.log(this.persona.idpk_persona);

    this.personaService.delete(this.persona.idpk_persona).subscribe({
      next:(result: Persona) => {
      }
    })
    alert("Persona Eliminada")

  }

  
}




 
