import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksAttributesComponent } from './tasks-attributes/tasks-attributes.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { TasksMainComponent } from './tasks-main/tasks-main.component';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from 'src/app/Shared/table/table.component';


export const routes: Routes = [
  {
    path: '', component: TasksMainComponent,children:[
      { path: 'attributes', component: TasksAttributesComponent},
      { path: 'roles', component: ManageRolesComponent}
    ]
    
  },


];
@NgModule({
  declarations: [
    TasksAttributesComponent,
    ManageRolesComponent,
    TasksMainComponent
  ],
  imports: [
    CommonModule,
    PrimengComponentsModule,
    RouterModule.forChild(routes),
    TranslateModule,
    TableComponent
  ]
})
export class TasksControlModule { }
