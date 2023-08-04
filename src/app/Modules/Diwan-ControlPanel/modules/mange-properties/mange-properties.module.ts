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
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { AddEditPropertiesComponent } from './add-edit-properties/add-edit-properties.component';
import { InputNumberComponent } from 'src/app/Shared/input-number/input-number.component';
import { ChipModule } from 'primeng/chip';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    AddEditPropertiesComponent
  ],
  imports: [
    CommonModule,
    PrimengComponentsModule,
    TranslateModule,
    TableComponent,
    ModalComponent,
    AttachmentComponent,
    InputComponent,
    SelectStatusComponent,
    LoadingComponent,
    InputNumberComponent,
    ChipModule,
    InputTextModule,
  ],
  exports:[
    AddEditPropertiesComponent
  ]
})
export class MangePropertiesModule { }
