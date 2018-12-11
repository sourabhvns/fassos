import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageService } from './manage.service';

const routes: Routes = [
  { path: 'orders', component: ManageOrderComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ManageOrderComponent,
    RouterModule
  ],
  providers : [ManageService],
  declarations: [ManageOrderComponent]
})
export class ManageModule { }
