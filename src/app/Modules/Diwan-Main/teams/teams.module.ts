import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { BadgeStatusComponent } from 'src/app/Shared/badge-status/badge-status.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';

export const routes: Routes = [
  {path: '', component: TeamListComponent}
]

@NgModule({
  declarations: [
    TeamListComponent,
    TeamCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PrimengComponentsModule,
    EntityViewerComponent,
    BreadcrumbComponent,
    BadgeStatusComponent,
    LoadingComponent
  ]
})
export class TeamsModule { }
