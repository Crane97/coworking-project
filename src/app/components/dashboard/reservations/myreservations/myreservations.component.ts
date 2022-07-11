import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/interfaces/Reservations/reservation';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReservationsService } from 'src/app/services/reservations.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteReservationComponent } from '../delete-reservation/delete-reservation.component';
import { ReservationComponent } from '../reservation/reservation.component';

@Component({
  selector: 'app-myreservations',
  templateUrl: './myreservations.component.html',
  styleUrls: ['./myreservations.component.css']
})
export class MyreservationsComponent implements OnInit {

  currentUser : Usuario;
  decodedJWT : any;
  logUser : String;
  myReservations : Reservation[];

  constructor(private dialogRef : MatDialog, 
    private reservationService : ReservationsService, 
    private userService : UsersService, 
    private restapi : RestapiService) { }

  ngOnInit(): void {
    this.decodedJWT = this.restapi.userLogged();
    console.log(this.decodedJWT);
    if(this.decodedJWT){
      this.logUser = this.decodedJWT.sub;
      console.log("el logUser "+this.logUser);
      this.userService.getUserByUsername(this.logUser).subscribe(data => {
        this.currentUser = data;
        console.log(this.currentUser);
        this.reservationService.getReservationsByUserId(this.currentUser.id).subscribe(data=>{
          this.myReservations = data;
          console.log(this.myReservations);
        });
      });
    }
  }

  openDialog(reservationPop : Reservation){
    this.dialogRef.open(DeleteReservationComponent,{
      data: {
         reservation : reservationPop
      }
    }
    );
  }

}
