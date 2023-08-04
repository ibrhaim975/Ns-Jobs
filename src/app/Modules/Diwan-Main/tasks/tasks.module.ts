import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { RouterModule, Routes } from '@angular/router';
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
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AttachmentComponent } from 'src/app/Shared/attachment/attachment.component';
import { CommentsComponent } from 'src/app/Shared/comments/comments.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { FindUserComponent } from 'src/app/Shared/find-user/find-user.component';
import { FindTagsComponent } from 'src/app/Shared/find-tags/find-tags.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { TextAreaComponent } from 'src/app/Shared/text-area/text-area.component';
import { CalendarComponent } from 'src/app/Shared/calendar/calendar.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { TaskEditAddComponent } from './task-EditAdd/task-EditAdd.component';
import { TableComponent } from 'src/app/Shared/table/table.component';
import { DynamicPropertiesPreviewComponent } from 'src/app/Shared/dynamic-properties-preview/dynamic-properties-preview.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },

];

@NgModule({
  declarations: [
    TaskListComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    PrimengComponentsModule,
    RouterModule.forChild(routes),
    TranslateModule,
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
    TaskDetailsComponent,
    TaskEditAddComponent,
    TableComponent,
    DynamicPropertiesPreviewComponent
  ]
})
export class TasksModule { }
