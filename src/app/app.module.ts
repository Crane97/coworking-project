import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/dashboard/user/profile/profile.component';
import { RoomComponent } from './components/dashboard/rooms/room/room.component';
import { EditProfileComponent } from './components/dashboard/user/edit-profile/edit-profile.component';
import { ReservationComponent } from './components/dashboard/reservations/reservation/reservation.component';
import { RecursiveReservationComponent } from './components/dashboard/reservations/recursive-reservation/recursive-reservation.component';
import { DaysReservationComponent } from './components/dashboard/reservations/days-reservation/days-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RoomComponent,
    EditProfileComponent,
    ReservationComponent,
    RecursiveReservationComponent,
    DaysReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
