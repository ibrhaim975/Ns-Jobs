import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { CardColoredComponent } from 'src/app/Shared/card-colored/card-colored.component';
import { BarChartComponent } from 'src/app/Shared/Charts/bar-chart/bar-chart.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { DashboredDetailsComponent } from './dashbored-details/dashbored-details.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { SliderComponent } from 'src/app/Shared/prgoress/prgoress.component';
import { TableComponent } from 'src/app/Shared/table/table.component';

export const routes: Routes = [
  { path: '', component:  DashboardMainComponent},

]; 

@NgModule({
  declarations: [
    DashboardMainComponent,
    DashboredDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PrimengComponentsModule,
    // shared
    BreadcrumbComponent,
    CardColoredComponent,
    BarChartComponent,
    LoadingComponent,
    ModalComponent,
    SliderComponent,
    TableComponent
 
  ]
})
export class DashboardModule { }
