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

@NgModule({
  declarations: [
    AppComponent,
    ProfileSelectionComponent,
    DealerManagementComponent,
    CarDealershipComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LogInViewModule,
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
