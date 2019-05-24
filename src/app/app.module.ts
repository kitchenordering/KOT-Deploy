import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';




import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import{HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { NgProgressModule } from 'ngx-progressbar';


import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
// import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
// import { MapsComponent } from './maps/maps.component';
// import { NotificationsComponent } from './notifications/notifications.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
// import { MainfilterPipe } from './mainfilter.pipe';
// import { UpgradeComponent }   from './upgrade/upgrade.component';

// import { LoginComponent } from './app/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    // MainfilterPipe,
    // UpgradeComponent
    
    // LoginComponent,

  ],
  imports: [
    BrowserAnimationsModule,
NgxWebstorageModule.forRoot(),
    FormsModule,
    HttpModule,
    ComponentsModule,
    NgProgressModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
 
    RouterModule.forRoot([
      // {
      //   path: '',
      //   component: AppComponent 
      // },
      {
        path: 'login',
        component: LoginComponent
      },
     
     ]),
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
