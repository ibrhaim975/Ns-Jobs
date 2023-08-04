import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomModulesModule } from './custom-modules/custom-modules.module';
import { UsersGroupsModule } from './users-groups/users-groups.module';
import { GeneralSettingsModule } from './general-settings/general-settings.module';


export const routes: Routes = [
  { path: 'dashboard', loadChildren: () => DashboardModule },
  { path: 'modules', loadChildren: () => CustomModulesModule },
  { path: 'usersgroup', loadChildren: () => UsersGroupsModule },
  { path: 'generalsettings', loadChildren: () => GeneralSettingsModule }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class ContorlPanalModule { }
