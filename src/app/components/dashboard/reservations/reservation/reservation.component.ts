import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  dateToday : Date;
  reservation : Reservation;
  availableTime : number[];
  schedules : any;
  currentDate : any;

  constructor(private fb : FormBuilder, private route : ActivatedRoute, private roomService : RoomsService, private reservationService : ReservationsService) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      start: [''],
      end: [''],
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
    this.reservationService.getReservationsByRoomByDay(this.room.id, this.dateToday).subscribe(data =>{
      this.availableTime = data;
      const aux = this.availableTime || {};
      console.log(this.availableTime);
      for(let i = 0; i < this.availableTime.length; i++){
        aux[i] = this.availableTime[i][0] + ":" + this.availableTime[i][1];
      }
      this.schedules = aux;
      console.log(this.schedules);
    });
    
  }

  getCurrentDate(event) : void {
    this.dateToday = new Date(event);
    //this.dateToday = this.dateToday.replace(" ", "");
    console.log(this.dateToday);
    console.log(this.dateToday.toLocaleDateString("es-ES"));
    this.getAvailableTime();
  }

  newReservation(){
    console.log("llamada newReservation()");
    this.reservationService.getReservationsByRoomByDay(this.room.id, this.dateToday).subscribe(data=>{
      
    });
  }

}
