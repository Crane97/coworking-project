import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/interfaces/Reservations/reservation';
import { Room } from 'src/app/interfaces/room';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReservationsService } from 'src/app/services/reservations.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { UsersService } from 'src/app/services/users.service';
import { ReservationPaymentComponent } from '../reservation-payment/reservation-payment.component';
import { ReservationPayment } from '../../../../interfaces/Reservations/reservationPayment';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from 'src/app/interfaces/invoice'

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  form: FormGroup;
  room: Room;
  dateToday: Date;
  reservation: Reservation;

  reservationResponse: Reservation;

  availableTime: number[];
  schedules: any;
  currentDate: any;
  currentUser: Usuario;

  invoice: Invoice;

  reservationPayment: ReservationPayment;

  decodedJWT: any;
  logUser: String;


  constructor(private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private reservationService: ReservationsService,
    private restapi: RestapiService,
    private userService: UsersService,
    private dialogRef: MatDialog,
    private invoiceService: InvoiceService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = <number>params['id'];
      if (id != null) {
        this.roomService.getRoom(id).subscribe(data => {
          this.room = data;
          this.form = this.fb.group({
            description: ['', Validators.required],
            date: [''],
            start: [''],
            end: [''],
            place: [''],
            room: this.room,
            user: [''],
          });
        });
        this.decodedJWT = this.restapi.userLogged();
        console.log(this.decodedJWT);
        if (this.decodedJWT) {
          this.logUser = this.decodedJWT.sub;
          this.userService.getUserByUsername(this.logUser).subscribe(data => {
            this.currentUser = data;
            console.log(this.currentUser);
            this.form.controls['user'].setValue(this.currentUser);
          });
        }
      }
    });
  }

  getAvailableTime(): void {
    this.reservationService.getReservationsByRoomByDay(this.room.id, this.dateToday).subscribe(data => {
      this.availableTime = data;
      const aux = this.availableTime || {};
      for (let i = 0; i < this.availableTime.length; i++) {
        aux[i] = this.availableTime[i][0] + ":" + this.availableTime[i][1];
      }
      this.schedules = aux;
    });
  }

  getCurrentDate(event): void {
    console.log("getCurrentDate");
    this.dateToday = new Date(event);
    this.getAvailableTime();
  }

  newReservation() {
    this.reservation = this.form.value;
    this.reservationService.addNewReservation(this.reservation).subscribe(data => {
      if (data) {
        this.reservationResponse = JSON.parse(data);
        this._snackBar.open('Se ha creado la reserva correctamente', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
          //this.router.navigateByUrl("login"); que te enlace a mis reservas
        });
        this.reservationPaymentAssignement(this.reservationResponse);
      }
    },
    error => {
      console.log(error);
      console.log(error.status);
      this._snackBar.open('Ha habido un error a la hora de crear la reserva, revisa los horarios que has seleccionado y si hay horarios reservados en medio.', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
        //this.router.navigateByUrl("login"); que te enlace a mis reservas
      });
    }
    );
  }

  reservationPaymentAssignement(res: Reservation) {
    this.invoiceService.getReservationPaymentByReservationId(res.id).subscribe(data => {
      console.log("entro en el invoice service");
      this.reservationPayment = data;
      this.openReservationPayment();
    });
  }

  openReservationPayment() {

    console.log("entro en el openReservationPayment");

    this.dialogRef.open(ReservationPaymentComponent, {
      data: {
        reservationPayment: this.reservationPayment
      }
    });
  }

}
