import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';


//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/dashboard/user/profile/profile.component';
import { RoomComponent } from './components/dashboard/rooms/room/room.component';
import { EditProfileComponent } from './components/dashboard/user/edit-profile/edit-profile.component';
import { ReservationComponent } from './components/dashboard/reservations/reservation/reservation.component';
import { RecursiveReservationComponent } from './components/dashboard/reservations/recursive-reservation/recursive-reservation.component';
import { DaysReservationComponent } from './components/dashboard/reservations/days-reservation/days-reservation.component';
import { MyreservationsComponent } from './components/dashboard/reservations/myreservations/myreservations.component';
import { DeleteReservationComponent } from './components/dashboard/reservations/delete-reservation/delete-reservation.component';
import { DeleteUserComponent } from './components/dashboard/user/delete-user/delete-user.component';
import { DeleteRoomComponent } from './components/admin-mode/delete-room/delete-room.component';
import { ReservationPaymentComponent } from './components/dashboard/reservations/reservation-payment/reservation-payment.component';
import { FaceToFaceComponent } from './components/dashboard/reservations/face-to-face/face-to-face.component';
import { CompaniesComponent } from './components/dashboard/companies/companies/companies.component';

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
    DaysReservationComponent,
    MyreservationsComponent,
    DeleteReservationComponent,
    DeleteUserComponent,
    DeleteRoomComponent,
    ReservationPaymentComponent,
    FaceToFaceComponent,
    CompaniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51L4jA9EbpLL7D6KIluDen1sIoPDoIzZXhnXqtorh47Lzf92C0Xfy9HUQHgmvPYzJThhzAzRElKz8wGcOSBKmRA4200Ah8aZNaj'),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
