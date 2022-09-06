import { Component, OnInit } from '@angular/core';
import { ConcessionariService } from '../service/Concessionari/concessionari.service';

@Component({
  selector: 'app-dealer-management',
  templateUrl: './dealer-management.component.html',
  styleUrls: ['./dealer-management.component.css']
})
export class DealerManagementComponent implements OnInit {


  constructor(private concessionariService: ConcessionariService ) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('auth-token'));
            this.concessionariService.listConcessionari().subscribe({
              next:(result:any)=>{
                console.log(result);
                
              },
              error:(error:Error)=>{
                console.log(Error);
                
              }
            })
  }

}
