import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppMainComponent } from './Layout/Main/app.main.component';
import { AppNotfoundComponent } from './Layout/NotFound/app.notfound.component';
import { AuthModule } from './Modules/auth/auth.module';
import { AuthGuard } from './Modules/auth/guards/auth.guard';
import { GuestGuard } from './Modules/auth/guards/guest.guard';
import { DashboardModule } from './Modules/Diwan-ControlPanel/dashboard/dashboard.module';
import { CustomModulesModule } from './Modules/Diwan-ControlPanel/custom-modules/custom-modules.module';
import { UsersGroupsModule } from './Modules/Diwan-ControlPanel/users-groups/users-groups.module';
import { GeneralSettingsModule } from './Modules/Diwan-ControlPanel/general-settings/general-settings.module';
import { MainModule } from './Modules/Diwan-Main/main.module';





@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'controlPanel', component: AppMainComponent,
                children: [
                    { path: '', loadChildren: () => DashboardModule },
                    { path: 'modules', loadChildren: () => CustomModulesModule },
                    { path: 'usersgroup', loadChildren: () => UsersGroupsModule },
                    { path: 'generalsettings', loadChildren: () => GeneralSettingsModule }
                ]
            },
            {
                path: '', loadChildren: () => MainModule,
          
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
