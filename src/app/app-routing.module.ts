import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDealershipComponent } from './car-dealership/car-dealership.component';
import { DealerManagementComponent } from './dealer-management/dealer-management.component';
import { LogInViewComponent } from './log-in-view/log-in-view/log-in-view.component';
import { PersonComponent } from './person/person.component';
import { ProfileSelectionComponent } from './profile-selection/profile-selection.component';

const routes: Routes = [

  {path: '', component : LogInViewComponent},

  {path: 'profile', component : ProfileSelectionComponent},

  {path: 'person', component : PersonComponent},

  {path: 'dealer', component : DealerManagementComponent},

  {path: 'concesionario', component : CarDealershipComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
