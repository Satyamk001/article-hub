import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterGuardService } from '../services/router-guard.service';
import { HelpDetailsComponent } from './help-details/help-details.component';

const routes: Routes = [
  {path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
      component:DashboardComponent,
      },
      {
        path:'dashboard',
      component:DashboardComponent,
      canActivate:[RouterGuardService]
      },
      {
        path:'path',
      component:HelpDetailsComponent,
      canActivate:[RouterGuardService]
      },
      {
        path:'**',
        component:DashboardComponent,
        canActivate:[RouterGuardService]
      }
    ]

  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
