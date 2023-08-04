import { CommitteesListComponent } from './committees-list/committees-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { BadgeStatusComponent } from 'src/app/Shared/badge-status/badge-status.component';
import { circleButtonComponent } from 'src/app/Shared/circle-button/circle-button.component';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { SliderComponent } from 'src/app/Shared/prgoress/prgoress.component';
import { CardColoredComponent } from 'src/app/Shared/card-colored/card-colored.component';
import { BarChartComponent } from 'src/app/Shared/Charts/bar-chart/bar-chart.component';
import { ProgressComponent } from 'src/app/Shared/Charts/progress/progress.component';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { AttachmentComponent } from 'src/app/Shared/attachment/attachment.component';
import { CommentsComponent } from 'src/app/Shared/comments/comments.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { FindUserComponent } from 'src/app/Shared/find-user/find-user.component';
import { FindTagsComponent } from 'src/app/Shared/find-tags/find-tags.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { TextAreaComponent } from 'src/app/Shared/text-area/text-area.component';
import { CalendarComponent } from 'src/app/Shared/calendar/calendar.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { CommonModule } from '@angular/common';
import { BadgeButtonComponent } from 'src/app/Shared/badge-button/badge-button.component';
import { CommitteesCardComponent } from './committees-card/committees-card.component';
import { TextEditorComponent } from 'src/app/Shared/text-editor/text-editor.component';
import { ImageUploadComponent } from 'src/app/Shared/image-upload/image-upload.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { TimelineActivitiesComponent } from 'src/app/Shared/timeline-activities/timeline-activities.component';
import { CommitteesDetailsComponent } from './committees-details/committees-details.component';
import { CommitteesMeetingsComponent } from './committees-meetings/committees-meetings.component';
import { AddEditMeetingsComponent } from '../meetings/add-edit-meetings/add-edit-meetings.component';
import { MeetingsDetailsComponent } from '../meetings/meetings-details/meetings-details.component';
import { CommitteeBoardDocumentsComponent } from './committee-board-documents/committee-board-documents.component';
import { CommitteesAddEditComponent } from './committees-add-edit/committees-add-edit.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { DynamicPropertiesPreviewComponent } from 'src/app/Shared/dynamic-properties-preview/dynamic-properties-preview.component';
import { TableComponent } from 'src/app/Shared/table/table.component';
export const routes: Routes = [
  { path: '', component:  CommitteesListComponent},

]; 

@NgModule({
  declarations: [
    CommitteesListComponent,
    CommitteesCardComponent,
    CommitteesDetailsComponent,
    CommitteesMeetingsComponent,
    CommitteeBoardDocumentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PrimengComponentsModule,
    // shared
    circleButtonComponent,
    EntityViewerComponent,
    BadgeStatusComponent,
    SliderComponent,
    CardColoredComponent,
    BarChartComponent,
    ProgressComponent,
    BreadcrumbComponent,
    AttachmentComponent,
    CommentsComponent,
    SidebarComponent,
    FindUserComponent,
    SelectStatusComponent,
    FindTagsComponent,
    InputComponent,
    TextAreaComponent,
    CalendarComponent,
    LoadingComponent,
    BadgeButtonComponent,
    TextEditorComponent,
    ImageUploadComponent,
    TimelineActivitiesComponent,
    AddEditMeetingsComponent,
    MeetingsDetailsComponent,
    CommitteesAddEditComponent,
    ModalComponent,
    DynamicPropertiesPreviewComponent,
    TableComponent
  ]
})
export class CommitteesModule { }
