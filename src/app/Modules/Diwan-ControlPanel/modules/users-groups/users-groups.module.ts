import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { UsersGroupsMainComponent } from './users-groups-main/users-groups-main.component';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from 'src/app/Shared/table/table.component';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { FindUserComponent } from 'src/app/Shared/find-user/find-user.component';
import { UsersGroupListComponent } from './users-group-list/users-group-list.component';
import { AccessibilityModule } from '../accessibility/accessibility.module';


export const routes: Routes = [
  {
    path: '', component: UsersGroupsMainComponent,children:[
      { path: 'groups', component: GroupsListComponent},
      { path: 'users', component: UserListComponent},
      { path: 'accessibility', loadChildren: () => AccessibilityModule },

    ]
    
  },


];
@NgModule({
  declarations: [
    UserListComponent,
    GroupsListComponent,
    UsersGroupsMainComponent,
    AddEditGroupComponent,
    AddEditUserComponent,
    UsersGroupListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengComponentsModule,
    TranslateModule,
    TableComponent,
    ModalComponent,
    InputComponent,
    FindUserComponent
  ]
})
export class UsersGroupsModule { }
