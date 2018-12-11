import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodDashboardComponent } from './food-dashboard/food-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { WebsocketService } from './dashboard.service';
import {MatFormFieldModule, MatButtonModule, MatCheckboxModule,
  MatMenuModule, MatInputModule, MatDialogModule,
  MatSelectModule, MatNativeDateModule} from '@angular/material';

const routes: Routes = [
  { path: 'graph', component: FoodDashboardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    RouterModule,
    FoodDashboardComponent
  ],
  providers: [WebsocketService],
  declarations: [FoodDashboardComponent]
})
export class DashboardModule { }
