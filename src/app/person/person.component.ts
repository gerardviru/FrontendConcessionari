import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../service/Persona/persona.service';
import { Persona } from '../models/Persona/persona.model';
import { ProvinciaService } from '../service/Provincia/provincia.service';
import { Provincia } from '../models/provincia/provincia.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ConcessionariService } from '../service/Concessionari/concessionari.service';
import { Concesionario } from '../models/Concesionario/concesionario.model';
import { Concessionari } from '../models/enum/concessionari/concessionari.model';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  disabled: boolean = true;

  persona: any = {};

  provinciaSelected = "";

  conSelected = "";

  idprovSelected = "";

  provincia: any;

  Dpersona!: Persona;

  newPerson: any;

  listCon: any;

  listIdProvConc: any;

  myForm: FormGroup;

  constructor(private personaService: PersonaService ,private router: Router, private provinciaService: ProvinciaService, private concesionarioService: ConcessionariService) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({

      idpk_persona: new FormControl(""),
      nif: new FormControl(""), 
      nom: new FormControl(""),
      cognom1: new FormControl(""),
      cognom2: new FormControl(""),
      telefon: new FormControl(""),
      email: new FormControl(""),
      provincia: new FormControl (""),
      concessionari: new FormControl (""),
      codi_postal: new FormControl(""),
      create_per: new FormControl(""),
      actualitzat_per: new FormControl(""),
      data_actualitzacio: new FormControl (""),

    })

    this.provinciaService.list().subscribe({
      next: (result: Provincia) => {
        this.provincia = result
        console.log(this.provincia)
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

  getValors(){
    console.log(this.persona.provincia);
    
    let provnom = {
      nom: this.provinciaSelected
    }
    this.persona.provincia = provnom;
    console.log(this.persona); 

    let conNom = {
      nom: this.conSelected,
      provincia: {
        idpk_prov: this.idprovSelected
      }
    }
    this.persona.concessionari = conNom

    console.log(this.persona);
    
    if(this.persona.length == 0){
      console.log("array vacio");
    } else {
 
      this.personaService.add(this.persona).subscribe({
        next:(result:Persona) => {
          this.Dpersona = result;
        }
      })
    }

    alert("Persona nueva añadida")
  }

  update(){
    
    this.disabled = !this.disabled;
    console.log("valor conce")
    console.log(this.newPerson)
    console.log('selected')
    console.log(this.provinciaSelected)
    
    this.newPerson.provincia = {

      "nom": this.provinciaSelected
    }
    
    this.personaService.update(this.newPerson.idpk_persona,this.newPerson).subscribe({
      next:(result: Persona) =>{
        console.log("result")
        console.log(result)
      }
    })
    console.log(this.newPerson)
  }


  back(){
    this.router.navigate(['/management-person'])
  }

  clear(){
    this.myForm.reset;
    this.disabled = !this.disabled;
  }

}
