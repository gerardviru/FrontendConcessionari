import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getInputValue(inputValue:string){
    console.log(inputValue);
    
    let idN = Number(inputValue);
    console.log(idN);
  }

  redirect(){
    this.router.navigate(['/concesionario']);
  }

}
