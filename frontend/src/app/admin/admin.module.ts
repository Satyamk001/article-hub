import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
//import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../shared/material-module';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HelpDetailsComponent,
    ConfirmationComponent,


    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
    MaterialModule
  ]
})
export class AdminModule { }
