import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { MainMeetingsComponent } from './main-meetings/main-meetings.component';
import { FullCalendarMeetingsComponent } from './full-calendar-meetings/full-calendar-meetings.component';
import { AddEditMeetingsComponent } from './add-edit-meetings/add-edit-meetings.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { TextAreaComponent } from 'src/app/Shared/text-area/text-area.component';
import { CalendarComponent } from 'src/app/Shared/calendar/calendar.component';
import { FindUserComponent } from 'src/app/Shared/find-user/find-user.component';
import { AttachmentComponent } from 'src/app/Shared/attachment/attachment.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { MeetingsDetailsComponent } from './meetings-details/meetings-details.component';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { CommentsComponent } from 'src/app/Shared/comments/comments.component';
import { TextEditorComponent } from 'src/app/Shared/text-editor/text-editor.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';
import { BadgeStatusComponent } from 'src/app/Shared/badge-status/badge-status.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { UpcomingPreviousMeetingsComponent } from './upcoming-previous-meetings/upcoming-previous-meetings.component';
import { DynamicPropertiesPreviewComponent } from 'src/app/Shared/dynamic-properties-preview/dynamic-properties-preview.component';

export const routes: Routes = [
  { path: '', component:  MainMeetingsComponent},

]; 
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    MainMeetingsComponent,
    FullCalendarMeetingsComponent,
    ListMeetingsComponent,
    UpcomingPreviousMeetingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TranslateModule,
    FullCalendarModule,
    PrimengComponentsModule,
    BreadcrumbComponent,
    ModalComponent,
    InputComponent,
    TextAreaComponent,
    CalendarComponent,
    FindUserComponent,
    SelectStatusComponent,
    AttachmentComponent,
    SidebarComponent,
    EntityViewerComponent,
    CommentsComponent,
    TextEditorComponent,
    LoadingComponent,
    BadgeStatusComponent,
    MeetingsDetailsComponent,
    AddEditMeetingsComponent,
    DynamicPropertiesPreviewComponent
  ]
})
export class MeetingsModule { }
