import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RecursiveReservation } from 'src/app/interfaces/Reservations/recursiveReservation';
import { Room } from 'src/app/interfaces/room';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReservationsService } from 'src/app/services/reservations.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-recursive-reservation',
  templateUrl: './recursive-reservation.component.html',
  styleUrls: ['./recursive-reservation.component.css']
})
export class RecursiveReservationComponent implements OnInit {

  form : FormGroup;
  room : Room;
  dateToday : Date;
  reservation : RecursiveReservation;

  availableTime : number[];
  schedules : any;
  currentDate : any;
  currentUser : Usuario;

  decodedJWT : any;
  logUser : String;


  constructor(private _snackBar: MatSnackBar, private fb : FormBuilder, private route : ActivatedRoute, private roomService : RoomsService, private reservationService : ReservationsService, private restapi : RestapiService, private userService: UsersService) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = <number>params['id'];
      if(id != null){        
        this.roomService.getRoom(id).subscribe(data => {
          this.room = data;
          console.log(this.room);
          this.form = this.fb.group({
            description: ['', Validators.required],
            entryDate : [''],
            finalDate : [''],
            weekday : [''],
            start: [''],
            end: [''],
            place: [''],
            room: this.room,
            user: [''],
          });
        });
        this.decodedJWT = this.restapi.userLogged();
        console.log(this.decodedJWT);
        if(this.decodedJWT){
          this.logUser = this.decodedJWT.sub;
          console.log("el logUser "+this.logUser);
          this.userService.getUserByUsername(this.logUser).subscribe(data => {
            this.currentUser = data;
            console.log("Soy el usuario " + this.currentUser);
            console.log(this.currentUser);
            this.form.controls['user'].setValue(this.currentUser);
            console.log(this.form);
          });
        }
      }
    });
  }

  getAvailableTime() : void{
    this.reservationService.getReservationsByRoomByDay(this.room.id, this.dateToday).subscribe(data =>{
      this.availableTime = data;
      const aux = this.availableTime || {};
      for(let i = 0; i < this.availableTime.length; i++){
        aux[i] = this.availableTime[i][0] + ":" + this.availableTime[i][1];
      }
      this.schedules = aux;
    });
  }

  getCurrentDate(event) : void {
    console.log("getCurrentDate");
    this.dateToday = new Date(event);
    this.getAvailableTime();
  }

  newReservation(){
    this.reservation = this.form.value;
    console.log("llamada newReservation()");
    console.log(this.currentUser);
    this.reservationService.addRecursiveReservation(this.reservation).subscribe(data=>{
      this._snackBar.open('Se ha creado la reserva correctamente', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'

        //this.router.navigateByUrl("login"); que te enlace a mis reservas
    });
  }
  );
  }

}
