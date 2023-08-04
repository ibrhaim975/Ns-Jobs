import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { AuthModule } from '../auth/auth.module';
import { GuestGuard } from '../auth/guards/guest.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => HomeModule },

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class MainModule { }
