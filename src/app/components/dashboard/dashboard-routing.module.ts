import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomComponent } from './room/room.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:[
    {path:'', component: HomeComponent},
    {path:'usuarios', component: UsersComponent},
    {path:'contacto', component: ContactComponent},
    {path:'salas', component: RoomsComponent},
    {path:'user/:id', component: ProfileComponent},
    {path:'room/:id', component : RoomComponent },
    {path:'user/edit/:id', component: EditProfileComponent},
    {path:'**', component: HomeComponent , pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
