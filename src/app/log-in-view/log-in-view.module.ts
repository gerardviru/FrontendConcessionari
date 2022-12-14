import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInViewComponent } from './log-in-view/log-in-view.component';
import { LogInComponent } from './log-in-view/log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    LogInViewComponent,
    LogInComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    LogInViewComponent
  ]
})
export class LogInViewModule { }
