import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';
import { MainfilterPipe } from '../../mainfilter.pipe';
import { NgProgressModule } from 'ngx-progressbar';

// import {BrowserModule} from '@angular/platform-browser';
import {NgxWebstorageModule} from 'ngx-webstorage';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    // BrowserModule,
        NgxWebstorageModule.forRoot(),
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgProgressModule
  
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    IconsComponent,
    MainfilterPipe
  ]
})

export class AdminLayoutModule {}
