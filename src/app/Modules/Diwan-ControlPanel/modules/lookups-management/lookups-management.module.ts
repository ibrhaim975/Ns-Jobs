import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLookupsComponent } from './list-lookups/list-lookups.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from 'src/app/Shared/table/table.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { IconPickerComponent } from 'src/app/Shared/icon-picker/icon-picker.component';
import { AddEditLookupComponent } from './add-edit-lookup/add-edit-lookup.component';
import { AddEditLookupItemComponent } from './add-edit-lookup-item/add-edit-lookup-item.component';
import { ColorInputComponent } from 'src/app/Shared/color-input/color-input.component';


export const routes: Routes = [
  {
    path: '', component: ListLookupsComponent,

  }
];
@NgModule({
  declarations: [
    ListLookupsComponent,
    AddEditLookupComponent,
    AddEditLookupItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengComponentsModule,
    TranslateModule,
    TableComponent,
    ModalComponent,
    InputComponent,
    SelectStatusComponent,
    LoadingComponent,
    IconPickerComponent,
    ColorInputComponent
  ]
})
export class LookupsManagementModule { }
