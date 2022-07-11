import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StripeService } from 'ngx-stripe';
import { CreatePaymentMethodData, StripeCardElement, StripeElement, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { ReservationPayment } from 'src/app/interfaces/Reservations/reservationPayment';
import { PaymentService } from 'src/app/services/payment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentIntentDto } from 'src/app/interfaces/payment-intent-dto';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-reservation-payment',
  templateUrl: './reservation-payment.component.html',
  styleUrls: ['./reservation-payment.component.css']
})
export class ReservationPaymentComponent implements OnInit {

  reservationPayment: ReservationPayment;

  loading$ = this.loadingService.loading$;

  card: StripeCardElement;
  elements: StripeElements;

  error: String;

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  }

  constructor(private _snackBar: MatSnackBar,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data,
    private stripeService: StripeService,
    private router: Router,
    private snackbar: MatSnackBar,
    private invoiceService: InvoiceService,
    private reservationService : ReservationsService,
    private loadingService : LoadingService
  ) {
    this.reservationPayment = data.reservationPayment;
  }

  public stripeForm = new FormGroup({
    name: new FormControl('', Validators.required),

  });

  ngOnInit(): void {
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        //Only mount the element for the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                fontWeight: '300',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element')
        }
      });
  }

  buy() {
    const name = this.stripeForm.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          this.generatePayment(result.token.id)
        } else if (result.error) {
          console.log(result.error.message);
          this.snackbar.open(result.error.message);
        }
      });
  }

  generatePayment(token: string) {
    this.stripeService.createPaymentMethod({
      type: 'card',
      card: { token },
    }).subscribe(
      data => {
        const paymentIntentDto: PaymentIntentDto = {
          token: token,
          description: this.reservationPayment.description,
          amount: this.reservationPayment.finalAmount * 100,
          currency: 'EUR',
          payment_method: data.paymentMethod.id
        };
        console.log(paymentIntentDto);
        this.paymentService.pay(paymentIntentDto, this.reservationPayment.id).subscribe(
          data => {
            console.log(data['id']);
            console.log(data['content']);
            this.confirmPayment(data['id']);
          }
        );
      }
    );
  }

  confirmPayment(id: string) {
    this.loadingService.show();
    this.paymentService.confirmPayment(id, this.reservationPayment.id).subscribe(data => {
      this._snackBar.open("Se ha confirmado el pago con id: " + data[`id`], '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.loadingService.hide();
    },
      err => {
        console.log("error");
        this._snackBar.open("Se ha producido un error al confirmar el pago", '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.loadingService.hide();
      })
  }

  cancelPayment(id: string) {
    this.paymentService.cancelPayment(id, this.reservationPayment.id).subscribe(data => {
      this._snackBar.open("Se ha cancelado el pago con id: " + data[`id`], '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    },
      err => {
        console.log("error");
        this._snackBar.open("Se ha producido un error al cancelar el pago", '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      })
  }

  payInPlace() {
    //TODO: Crear servicio para modificar factura y marcar que se pagará en puerta
    this.invoiceService.updatePayAtDoor(this.reservationPayment.id).subscribe(data =>{

    });
  }

  deleteReservations() {
    this._snackBar.open("No has seleccionado ningún método de pago, vamos a cancelar las reservas. Porfavor, vuelve a crear tu reserva y selecciona un método de pago", '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    //TODO: Crear servicio para eliminar las reservas creadas (con el id del invoice)
    this.reservationService.deleteReservationsByInvoiceId(this.reservationPayment.id).subscribe(data => {
      
    });
  }
}
