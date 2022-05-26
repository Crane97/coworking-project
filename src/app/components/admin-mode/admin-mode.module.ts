import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModeRoutingModule } from './admin-mode-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminModeComponent } from './admin-mode.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';


@NgModule({
  declarations: [
    AdminModeComponent,
    TabBarComponent
  ],
  imports: [
    CommonModule,
    AdminModeRoutingModule,
    SharedModule
  ]
})
export class AdminModeModule { }
