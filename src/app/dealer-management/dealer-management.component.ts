import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcessionariService } from '../service/Concessionari/concessionari.service';
import { Concessionari } from '../models/enum/concessionari/concessionari.model';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ProvinciaService } from '../service/Provincia/provincia.service';
import { Provincia } from '../models/provincia/provincia.model';

@Component({
  selector: 'app-dealer-management',
  templateUrl: './dealer-management.component.html',
  styleUrls: ['./dealer-management.component.css']
})
export class DealerManagementComponent implements OnInit {

  disabled: boolean = true
  provincia: any
  provinciaSelected: any
  concesionario!: Concessionari
  idN: any
  nconcesionario: any = {}
  myForm: FormGroup


  constructor(private concessionariService: ConcessionariService, private provinciaService: ProvinciaService, private router: Router ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({

      idpk_con: new FormControl('', Validators.required),
      cif: new FormControl('', Validators.required), 
      nom: new FormControl('', Validators.required),
      telefon: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      adreca: new FormControl('', Validators.required),
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


  getInputValue(nombreCon:string){
    console.log(nombreCon);
    
    if(nombreCon != null){
      this.concessionariService.getByNom(nombreCon).subscribe({
        next:(result: Concessionari) => {
          this.concesionario = result;
          console.log(this.concesionario); 
        }
      })
    }else{
      alert("Nombre del Concesionario no existe! Intentelo de nuevo")
    }
    
  }
  
  redirect(){
    this.router.navigate(['/concesionario']);
  }

  back(){
    this.router.navigate(['/menu']);
  }

  update(){
    
    this.disabled = !this.disabled;
    console.log("valor conce")
    console.log(this.nconcesionario)
    console.log('selected')
    console.log(this.provinciaSelected)
    
    this.nconcesionario.provincia = {

      "nom": this.provinciaSelected
    }
    
    this.concessionariService.update(this.nconcesionario.idpk_con,this.nconcesionario).subscribe({
      next:(result: Concessionari) =>{
        console.log("result")
        console.log(result)
      }
    })
    console.log(this.nconcesionario)
  }

  get nom(): any { return this.myForm.get('nom'); }
  get idpk_con(): any { return this.myForm.get('idpk_con'); }
  get cif(): any { return this.myForm.get('cif'); }
  get telefon(): any { return this.myForm.get('telefon'); }
  get adreca(): any { return this.myForm.get('adreca');}
  get email(): any { return this.myForm.get('email');}
  get prov(): any { return this.myForm.get('adreca');}

  resetForm() { this.myForm.setValue({nom: '', idpk_con: '', cif: '', telefon: '',email: '',adreca:'',prov: '',codi_postal:'',create_per:'',actualitzat_per:'',data_actualitzacio:''}); }

  
  deleteCon(){

    console.log(this.concesionario.idpk_con);
    
    this.concessionariService.delete(this.concesionario.idpk_con).subscribe ({
      next:(result: Concessionari) => {
      }
    })
    alert("Concesionario Eliminado")
  }

}
