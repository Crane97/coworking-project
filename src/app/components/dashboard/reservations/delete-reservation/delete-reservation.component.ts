import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/app/interfaces/Reservations/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';
import { MyreservationsComponent } from '../myreservations/myreservations.component';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.css']
})
export class DeleteReservationComponent implements OnInit {

  reservation : Reservation;
  parent : MyreservationsComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private reservationService: ReservationsService) {
    this.reservation = data.reservation;
  }

  ngOnInit(): void {
  }

  deleteReservation(){
    this.reservationService
  }

}
