import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPermissionsListComponent } from './roles-permissions-list/roles-permissions-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { TableComponent } from 'src/app/Shared/table/table.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { ActiveDeactiveRolesComponent } from './active-deactive-roles/active-deactive-roles.component';


export const routes: Routes = [
  {
    path: '', component: RolesPermissionsListComponent

  }
];
@NgModule({
  declarations: [
    RolesPermissionsListComponent,
    ActiveDeactiveRolesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengComponentsModule,
    TranslateModule,
    BreadcrumbComponent,
    TableComponent,
    ModalComponent,
    InputComponent,
    SelectStatusComponent,
    LoadingComponent,

  ]
})
export class RolesPermissionsModule { }
