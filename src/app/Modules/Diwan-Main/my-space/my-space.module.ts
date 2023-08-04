import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySpaceMainComponent } from './my-space-main/my-space-main.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { MySpaceCardComponent } from './my-space-card/my-space-card.component';
import { DynamicPropertiesPreviewComponent } from 'src/app/Shared/dynamic-properties-preview/dynamic-properties-preview.component';
import { SliderComponent } from 'src/app/Shared/prgoress/prgoress.component';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { BadgeStatusComponent } from 'src/app/Shared/badge-status/badge-status.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { MySpaceDetailsComponent } from './my-space-details/my-space-details.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { CommentsComponent } from 'src/app/Shared/comments/comments.component';
import { AttachmentComponent } from 'src/app/Shared/attachment/attachment.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { StepperVerticalComponent } from 'src/app/Shared/stepper-vertical/stepper-vertical.component';
import { MySpaceActionsComponent } from './my-space-actions/my-space-actions.component';
import { TextAreaComponent } from 'src/app/Shared/text-area/text-area.component';


export const routes: Routes = [
  { path: '', component:  MySpaceMainComponent},

]; 
@NgModule({
  declarations: [
    MySpaceMainComponent,
    MySpaceCardComponent,
    MySpaceDetailsComponent,
    MySpaceActionsComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PrimengComponentsModule,
    BreadcrumbComponent,
    DynamicPropertiesPreviewComponent,
    SliderComponent,
    EntityViewerComponent,
    BadgeStatusComponent,
    ModalComponent,
    SidebarComponent,
    SelectStatusComponent,
    CommentsComponent,
    AttachmentComponent,
    LoadingComponent,
    StepperVerticalComponent,
    TextAreaComponent

  ]
})
export class MySpaceModule { }
