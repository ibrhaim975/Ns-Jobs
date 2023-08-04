import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContorlPanalHomeComponent } from './contorl-panal-home/contorl-panal-home.component';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TasksControlModule } from '../modules/tasks-control/tasks-control.module';
import { GeneralSettingsModule } from '../modules/general-settings/general-settings.module';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { ImageUploadComponent } from 'src/app/Shared/image-upload/image-upload.component';
import { MeetingsContorlModule } from '../modules/meetings-contorl/meetings-contorl.module';
import { ManageModulesModule } from '../modules/manage-modules/manage-modules.module';
import { MangePropertiesModule } from '../modules/mange-properties/mange-properties.module';
import { LookupsManagementModule } from '../modules/lookups-management/lookups-management.module';
import { AddEditModuleComponent } from '../modules/manage-modules/add-edit-module/add-edit-module.component';
import { UsersGroupsModule } from '../modules/users-groups/users-groups.module';
import { TranslateModule } from '@ngx-translate/core';

export const routes: Routes = [
  {
    path: '', component: ContorlPanalHomeComponent, children: [
      { path: 'generalsettings', loadChildren: () => GeneralSettingsModule },
      { path: 'tasks', loadChildren: () => TasksControlModule },
      { path: 'meetings', loadChildren: () => MeetingsContorlModule },
      { path: 'modules', loadChildren: () => ManageModulesModule },
      { path: 'Mangeproperties', loadChildren: () => MangePropertiesModule },
      { path: 'lookups', loadChildren: () => LookupsManagementModule },
      { path: 'usersgroup', loadChildren: () => UsersGroupsModule }


    ]

  },

  
];

@NgModule({
  declarations: [
    ContorlPanalHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengComponentsModule,
    TranslateModule,
    BreadcrumbComponent,
    ImageUploadComponent,
    AddEditModuleComponent,
    UsersGroupsModule
    
  ]
})
export class ContorlPanelModule { }
