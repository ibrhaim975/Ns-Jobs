import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowChartComponent } from './workflow-chart/workflow-chart.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { TranslateModule } from '@ngx-translate/core';
import { WorkflowFormComponent } from './workflow-form/workflow-form.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { MultiSelectComponent } from 'src/app/Shared/multi-select/multi-select.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { WorkflowregistryComponent } from './workflowregistry/workflowregistry.component';
import { TableComponent } from 'src/app/Shared/table/table.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { InputNumberComponent } from 'src/app/Shared/input-number/input-number.component';


export const routes: Routes = [

  { path: '', component: WorkflowregistryComponent },
  { path: 'workflow/:registryID', component: WorkflowChartComponent }

];
@NgModule({
  declarations: [
    WorkflowChartComponent,
    WorkflowFormComponent,
    WorkflowregistryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengComponentsModule,
    DiagramModule,
    SelectStatusComponent,
    TranslateModule,
    SidebarComponent,
    MultiSelectComponent,
    InputComponent,
    ModalComponent,
    TableComponent,
    LoadingComponent,
    InputNumberComponent
  ]
})
export class WorkflowModule { }
