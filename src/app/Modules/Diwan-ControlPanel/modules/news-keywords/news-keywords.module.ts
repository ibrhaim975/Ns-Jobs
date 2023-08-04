import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from 'src/app/Shared/table/table.component';
import { NewKeywordsListComponent } from './new-keywords-list/new-keywords-list.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { AddEditKeywordsComponent } from './add-edit-keywords/add-edit-keywords.component';



export const routes: Routes = [
  {
    path: '', component: NewKeywordsListComponent,

  },

];
@NgModule({
  declarations: [ NewKeywordsListComponent, AddEditKeywordsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengComponentsModule,
    TranslateModule,
    TableComponent,
    ModalComponent,
    InputComponent,
    LoadingComponent
    
  ]
})
export class NewsKeywordsModule { }
