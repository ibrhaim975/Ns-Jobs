import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNewsComponent } from './list-news/list-news.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { NewCardComponent } from './new-card/new-card.component';
import { AddEditNewsComponent } from './add-edit-news/add-edit-news.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { TextAreaComponent } from 'src/app/Shared/text-area/text-area.component';
import { CalendarComponent } from 'src/app/Shared/calendar/calendar.component';
import { FindUserComponent } from 'src/app/Shared/find-user/find-user.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { AttachmentComponent } from 'src/app/Shared/attachment/attachment.component';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { CommentsComponent } from 'src/app/Shared/comments/comments.component';
import { TextEditorComponent } from 'src/app/Shared/text-editor/text-editor.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { BadgeStatusComponent } from 'src/app/Shared/badge-status/badge-status.component';
import { circleButtonComponent } from 'src/app/Shared/circle-button/circle-button.component';
import { SliderComponent } from 'src/app/Shared/prgoress/prgoress.component';
import { CardColoredComponent } from 'src/app/Shared/card-colored/card-colored.component';
import { BarChartComponent } from 'src/app/Shared/Charts/bar-chart/bar-chart.component';
import { ProgressComponent } from 'src/app/Shared/Charts/progress/progress.component';
import { FindTagsComponent } from 'src/app/Shared/find-tags/find-tags.component';
import { ImageUploadComponent } from 'src/app/Shared/image-upload/image-upload.component';
import { TimelineActivitiesComponent } from 'src/app/Shared/timeline-activities/timeline-activities.component';
import { NewDetailsComponent } from './new-details/new-details.component';
import { ListNewsCardsComponent } from './list-news-cards/list-news-cards.component';
import { NewsMainComponent } from './news-main/news-main.component';
import { BadgeButtonComponent } from 'src/app/Shared/badge-button/badge-button.component';

export const routes: Routes = [
  { path: '', component:  NewsMainComponent},

]; 

@NgModule({
  declarations: [
    ListNewsComponent,
    NewCardComponent,
    AddEditNewsComponent,
    NewDetailsComponent,
    ListNewsCardsComponent,
    NewsMainComponent
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
    TextEditorComponent,
    ImageUploadComponent,
    TimelineActivitiesComponent,
    BadgeButtonComponent
  ]
})
export class NewsModule { }
