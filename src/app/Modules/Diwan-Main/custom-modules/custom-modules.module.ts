import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomModuleMainComponent } from './custom-module-main/custom-module-main.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { CardColoredComponent } from 'src/app/Shared/card-colored/card-colored.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { TableComponent } from 'src/app/Shared/table/table.component';
import { SliderComponent } from 'src/app/Shared/prgoress/prgoress.component';
import { AddEditCustomModuleComponent } from './add-edit-custom-module/add-edit-custom-module.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { DynamicPropertiesComponent } from 'src/app/Shared/dynamic-properties/dynamic-properties.component';
import { CustomModuleDetailsComponent } from './custom-module-details/custom-module-details.component';
import { DynamicPropertiesPreviewComponent } from 'src/app/Shared/dynamic-properties-preview/dynamic-properties-preview.component';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';


export const routes: Routes = [
  { path: ':id', component:  CustomModuleMainComponent},

]; 


@NgModule({
  declarations: [
    CustomModuleMainComponent,
    AddEditCustomModuleComponent,
    CustomModuleDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PrimengComponentsModule,
    // shared
    BreadcrumbComponent,
    CardColoredComponent,
    LoadingComponent,
    ModalComponent,
    SliderComponent,
    TableComponent,
    SidebarComponent,
    DynamicPropertiesComponent,
    DynamicPropertiesPreviewComponent,
    EntityViewerComponent

  ]
})
export class CustomModulesModule { }
