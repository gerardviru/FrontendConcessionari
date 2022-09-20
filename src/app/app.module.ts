import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInViewModule } from './log-in-view/log-in-view.module';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileSelectionComponent } from './profile-selection/profile-selection.component';
import { DealerManagementComponent } from './dealer-management/dealer-management.component';
import { CarDealershipComponent } from './car-dealership/car-dealership.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonComponent } from './person/person.component';
import { MenuComponent } from './menu/menu.component';
import { PersonManagementComponent } from './person-management/person-management.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileSelectionComponent,
    DealerManagementComponent,
    CarDealershipComponent,
    NavBarComponent,
    PersonComponent,
    MenuComponent,
    PersonManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LogInViewModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
