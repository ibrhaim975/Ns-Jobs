import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from 'src/app/Shared/table/table.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { AttachmentComponent } from 'src/app/Shared/attachment/attachment.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { AddEditModuleComponent } from './add-edit-module/add-edit-module.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { IconPickerComponent } from 'src/app/Shared/icon-picker/icon-picker.component';
import { ModuleFormComponent } from './module-form/module-form.component';
import { MangePropertiesModule } from '../mange-properties/mange-properties.module';
import { BadgeStatusComponent } from 'src/app/Shared/badge-status/badge-status.component';
import { ModulesMainComponent } from './modules-main/modules-main.component';
import { RolesPermissionsModule } from '../roles-permissions/roles-permissions.module';
import { WorkflowModule } from '../workflow/workflow.module';
import { NewsKeywordsModule } from '../news-keywords/news-keywords.module';

export const routes: Routes = [
  {
    path: ':id', component: ModulesMainComponent,
    children: [
      {
        path: 'properties', component: ModuleFormComponent,

      },
      {
        path: 'roles', loadChildren: () => RolesPermissionsModule,

      },
      { path: 'approvals', loadChildren: () => WorkflowModule },
      
      { path: 'keywords', loadChildren: () => NewsKeywordsModule }


    ]

  },


];

@NgModule({
  declarations: [
    ModuleFormComponent,
    ModulesMainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengComponentsModule,
    TranslateModule,
    TableComponent,
    ModalComponent,
    AttachmentComponent,
    InputComponent,
    SelectStatusComponent,
    LoadingComponent,
    IconPickerComponent,
    MangePropertiesModule,
    AddEditModuleComponent,
    BadgeStatusComponent
  ]
})
export class ManageModulesModule { }
