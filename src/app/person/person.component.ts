import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../service/Persona/persona.service';
import { Persona } from '../models/Persona/persona.model';
import { ProvinciaService } from '../service/Provincia/provincia.service';
import { Provincia } from '../models/provincia/provincia.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persona: any = {};

  provinciaSelected = "";

  provincia: any;

  Dpersona!: Persona;

  constructor(private personaService: PersonaService ,private router: Router, private provinciaService: ProvinciaService) { }

  ngOnInit(): void {

    this.provinciaService.list().subscribe({
      next: (result: Provincia) => {
      
        
        this.provincia = result;
        console.log(this.provincia);
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

  redirect(){

    this.router.navigate(['/management-person']);
  }

}
