import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentIntentDto } from '../interfaces/payment-intent-dto';


const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  stripeURL = 'http://localhost:9090/api/stripe/';

  constructor(private httpClient : HttpClient) { }

  pay(paymentIntentDto : PaymentIntentDto, id : number):Observable<string>{
    return this.httpClient.post<string>(this.stripeURL + 'paymentIntent/' + id, paymentIntentDto, cabecera);
  }

  confirmPayment(id: string, idInvoice: number): Observable<string>{
    return this.httpClient.post<string>(this.stripeURL + "confirm/" + id + "/" + idInvoice, {}, cabecera);
  }

  cancelPayment(id: string, idInvoice: number): Observable<string>{
    return this.httpClient.post<string>(this.stripeURL + "cancel/" + id + "/" + idInvoice, {}, cabecera);
  }

  confirmOrder(id : string): Observable<any>{
    return this.httpClient.patch(this.stripeURL+ "orders/confirm/"+id, {});
  }

  createSubscription(priceId : string, userId : number): Observable<any>{
    return this.httpClient.post(this.stripeURL+"checkout/session/" + priceId + "/" + userId, {}, cabecera);
  }

}
