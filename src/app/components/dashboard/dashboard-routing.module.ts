import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './user/users/users.component';
import { RoomsComponent } from './rooms/rooms/rooms.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RoomComponent } from './rooms/room/room.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ReservationComponent } from './reservations/reservation/reservation.component';
import { RecursiveReservationComponent } from './reservations/recursive-reservation/recursive-reservation.component';
import { DaysReservationComponent } from './reservations/days-reservation/days-reservation.component';
import { MyreservationsComponent } from './reservations/myreservations/myreservations.component';
import { CompaniesComponent } from './companies/companies/companies.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:[
    {path:'', component: HomeComponent},
    {path:'usuarios', component: UsersComponent},
    {path:'contacto', component: ContactComponent},
    {path:'salas', component: RoomsComponent},
    {path:'empresas', component : CompaniesComponent},
    {path:'user/:id', component: ProfileComponent},
    {path:'room/:id', component : RoomComponent },
    {path:'room/:id/reservation', component : ReservationComponent},
    {path:'room/:id/daysReservation', component : DaysReservationComponent},
    {path:'room/:id/recursiveReservation', component : RecursiveReservationComponent},
    {path:'user/edit/:id', component: EditProfileComponent},
    {path:'user/myReservations/:id', component : MyreservationsComponent},
    {path:'**', component: HomeComponent , pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
