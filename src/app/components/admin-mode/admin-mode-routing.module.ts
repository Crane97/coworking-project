import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModeComponent } from './admin-mode.component';

const routes: Routes = [
  { path: '', component : AdminModeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModeRoutingModule { }
