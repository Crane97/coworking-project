import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { Reservation } from 'src/app/interfaces/reservation';
import { Room } from 'src/app/interfaces/room';
import { ReservationsService } from 'src/app/services/reservations.service';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  form : FormGroup;
  room : Room;
  reservation : Reservation;
  availableTime : String[];
  currentDate : any;

  constructor(private fb : FormBuilder, private route : ActivatedRoute, private roomService : RoomsService, private reservationService : ReservationsService) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      status: [''],
      place: ['']
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = <number>params['id'];
      if(id != null){
        this.roomService.getRoom(id).subscribe(data => {
          this.room = data;
        });
      }
    });
  }

  getAvailableTime() : void{
    if(this.currentDate){
      this.reservationService.getReservationsByRoomByDay(this.room.id, this.currentDate).subscribe(data =>{
        this.availableTime = data;
      });
    }
  }

  getCurrentDate() : void {
    
  }

  newReservation() {

  }

}
