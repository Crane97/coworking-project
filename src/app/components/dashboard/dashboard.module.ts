import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SalasComponent } from './salas/salas.component';
import { ContactoComponent } from './contacto/contacto.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    UsuariosComponent,
    SalasComponent,
    ContactoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
