import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';


@NgModule({
  
  imports: [
    CommonModule,
    
    ReactiveFormsModule,
    FormsModule,RouterTestingModule
  ],
  declarations: []
})
export class NotificationModule { }
