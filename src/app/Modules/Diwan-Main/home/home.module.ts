import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { CardColoredComponent } from 'src/app/Shared/card-colored/card-colored.component';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { SliderComponent } from 'src/app/Shared/prgoress/prgoress.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeTaskCardComponent } from './home-task-card/home-task-card.component';
import { TaskDetailsComponent } from '../tasks/task-details/task-details.component';
import { HomeCalendarComponent } from './home-calendar/home-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { TaskEditAddComponent } from '../tasks/task-EditAdd/task-EditAdd.component';
import { MeetingsDetailsComponent } from '../meetings/meetings-details/meetings-details.component';
import { AddEditMeetingsComponent } from '../meetings/add-edit-meetings/add-edit-meetings.component';
import { HomeCalenderCardComponent } from './home-calender-card/home-calender-card.component';

CardColoredComponent
export const routes: Routes = [
  { path: '', component: HomeScreenComponent },

];

@NgModule({
  declarations: [
    HomeScreenComponent,
    HomeTaskCardComponent,
    HomeCalendarComponent,
    HomeCalenderCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    //
    PrimengComponentsModule,
    CardColoredComponent,
    EntityViewerComponent,
    SliderComponent,
    TranslateModule,
    TaskDetailsComponent,
    FullCalendarModule,
    LoadingComponent,
    TaskEditAddComponent,
    MeetingsDetailsComponent,
    AddEditMeetingsComponent
  ]
})
export class HomeModule { }
