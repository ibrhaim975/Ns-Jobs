import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from './branding/branding.component';
import { RouterModule, Routes } from '@angular/router';
import { GeneralSettingsMainComponent } from './general-settings-main/general-settings-main.component';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { ImageUploadComponent } from 'src/app/Shared/image-upload/image-upload.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { InputMaskComponent } from 'src/app/Shared/input-mask/input-mask.component';
import { LogoUploaderComponent } from './logo-uploader/logo-uploader.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { ColorInputComponent } from 'src/app/Shared/color-input/color-input.component';


export const routes: Routes = [
  {
    path: '', component: GeneralSettingsMainComponent,children:[
      { path: 'branding', component: BrandingComponent},
      { path: 'calendar', component: CalendarComponent}
    ]
    
  },


];

@NgModule({
  declarations: [
    BrandingComponent,
    GeneralSettingsMainComponent,
    CalendarComponent,
    LogoUploaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengComponentsModule,
    TranslateModule,
    EntityViewerComponent,
    ImageUploadComponent,
    SelectStatusComponent,
    FormsModule,
    InputComponent,
    InputMaskComponent,
    LoadingComponent,
    ColorInputComponent
    
  ]
})
export class GeneralSettingsModule { }
