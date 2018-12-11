import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManageModule } from './manage/manage.module';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule
  },
  {
    path: 'manage',
    loadChildren: () => ManageModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
