import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsAttributesComponent } from './meetings-attributes/meetings-attributes.component';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsMainComponent } from './meetings-main/meetings-main.component';
import { MeetingsAgendaComponent } from './meetings-agenda/meetings-agenda.component';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from 'src/app/Shared/table/table.component';

export const routes: Routes = [
  {
    path: '', component: MeetingsMainComponent,children:[
      { path: 'attributes', component: MeetingsAttributesComponent},
      { path: 'agenda', component: MeetingsAgendaComponent}
    ]
    
  },


];

@NgModule({
  declarations: [
    MeetingsAttributesComponent,
    MeetingsMainComponent,
    MeetingsAgendaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengComponentsModule,
    TranslateModule,
    TableComponent
  ]
})
export class MeetingsContorlModule { }
