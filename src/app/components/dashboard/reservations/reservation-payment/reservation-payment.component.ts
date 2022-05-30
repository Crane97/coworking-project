import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationPayment } from 'src/app/interfaces/Reservations/reservationPayment';
import { Room } from 'src/app/interfaces/room';
import { Usuario } from 'src/app/interfaces/usuario';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-reservation-payment',
  templateUrl: './reservation-payment.component.html',
  styleUrls: ['./reservation-payment.component.css']
})
export class ReservationPaymentComponent implements OnInit {

  reservationPayment : ReservationPayment;
    

  constructor(private _snackBar : MatSnackBar, 
    private paymentService : PaymentService,
    @Inject(MAT_DIALOG_DATA) public data,
    ) {
      this.reservationPayment = data.reservationPayment;
     }

  ngOnInit(): void {
  }

  confirmPayment(id:String){
    this.paymentService.confirmPayment(id).subscribe(data =>{
      this._snackBar.open("Se ha confirmado el pago con id: "+ data[`id`]);
    },
    err => {
      console.log("error");
      this._snackBar.open("Se ha producido un error al confirmar el pago");
    })
  }

  cancelPayment(id:String){
    this.paymentService.cancelPayment(id).subscribe(data =>{
      this._snackBar.open("Se ha cancelado el pago con id: "+ data[`id`]);
    },
    err => {
      console.log("error");
      this._snackBar.open("Se ha producido un error al cancelar el pago");
    })
  }

}
