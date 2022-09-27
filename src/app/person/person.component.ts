import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../service/Persona/persona.service';
import { Persona } from '../models/Persona/persona.model';
import { ProvinciaService } from '../service/Provincia/provincia.service';
import { Provincia } from '../models/provincia/provincia.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  disabled: boolean = true;

  persona: any = {};

  provinciaSelected = "";

  provincia: any;

  Dpersona!: Persona;

  myForm: FormGroup;

  constructor(private personaService: PersonaService ,private router: Router, private provinciaService: ProvinciaService) { }

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
  }

  getValors(){
    console.log(this.persona.provincia);
    
    let provnom = {
      nom: this.provinciaSelected
    }
    this.persona.provincia = provnom;
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
  }

  back(){
    this.router.navigate(['/menu'])
  }

  clear(){
    this.myForm.reset;
    this.disabled = !this.disabled;
  }

}
