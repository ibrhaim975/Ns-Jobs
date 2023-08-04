import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppMainComponent } from './Layout/Main/app.main.component';
import { AppNotfoundComponent } from './Layout/NotFound/app.notfound.component';
import { AuthModule } from './Modules/auth/auth.module';
import { AuthGuard } from './Modules/auth/guards/auth.guard';
import { GuestGuard } from './Modules/auth/guards/guest.guard';
import { DashboardModule } from './Modules/Diwan-Main/dashboard/dashboard.module';
import { NewsModule } from './Modules/Diwan-Main/news/news.module';
import { CommitteesModule } from './Modules/Diwan-Main/committees/committees.module';
import { MeetingsModule } from './Modules/Diwan-Main/meetings/meetings.module';
import { TasksModule } from './Modules/Diwan-Main/tasks/tasks.module';
import { HomeModule } from './Modules/Diwan-Main/home/home.module';
import { ContorlPanelModule } from './Modules/Diwan-ControlPanel/main/contorl-panel.module';
import { CustomModulesModule } from './Modules/Diwan-Main/custom-modules/custom-modules.module';
import { MySpaceModule } from './Modules/Diwan-Main/my-space/my-space.module';
import { TeamsModule } from './Modules/Diwan-Main/teams/teams.module';





@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => HomeModule },
                    { path: 'tasks', loadChildren: () => TasksModule },
                    { path: 'meetings', loadChildren: () => MeetingsModule },
                    { path: 'committees', loadChildren: () => CommitteesModule },
                    { path: 'news', loadChildren: () => NewsModule },
                    { path: 'dashboard', loadChildren: () => DashboardModule },
                    { path: 'controlPanel', loadChildren: () => ContorlPanelModule },
                    { path: 'module', loadChildren: () => CustomModulesModule },
                    { path: 'mySpace', loadChildren: () => MySpaceModule },
                    { path: 'teams', loadChildren: () => TeamsModule },

                        
                ]
            },
            { path: 'notfound', component: AppNotfoundComponent },
            {
                path: 'login', loadChildren: () => AuthModule, canActivate: [GuestGuard],
            },
            { path: '**', redirectTo: '/notfound' },
            { path: '**', redirectTo: '' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
