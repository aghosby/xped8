import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, 
    children: [
      {
        path: 'human-resources',
        loadChildren: () => import('../hr/hr.module').then(m => m.HrModule) 
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule) 
      }
    ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
