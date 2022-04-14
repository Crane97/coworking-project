import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SalasComponent } from './salas/salas.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:[
    {path:'', component: InicioComponent},
    {path:'usuarios', component: UsuariosComponent},
    {path:'contacto', component: ContactoComponent},
    {path:'salas', component: SalasComponent},
    {path:'user/:id', component: ProfileComponent},
    {path:'room/:id', component : RoomComponent },
    {path:'**', component: InicioComponent , pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
