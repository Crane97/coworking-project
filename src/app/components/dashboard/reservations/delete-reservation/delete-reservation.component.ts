import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/app/interfaces/Reservations/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.css']
})
export class DeleteReservationComponent implements OnInit {

  reservation : Reservation;

  constructor(@Inject(MAT_DIALOG_DATA) public data, 
  private reservationService: ReservationsService) {
    this.reservation = data.reservation;
  }

  ngOnInit(): void {
  }

  deleteReservation(reservationId : number){
    console.log("He entrado en el metodo");
    this.reservationService.deleteReservation(reservationId).subscribe(data =>{
      
    });
  }

}
