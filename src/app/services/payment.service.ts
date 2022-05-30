import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  stripeURL = 'http://localhost:9090/api/stripe/';

  constructor(private httpClient : HttpClient) { }

  confirmPayment(id: String): Observable<String>{
    return this.httpClient.post<String>(this.stripeURL + "confirm/" + id, {}, cabecera);
  }

  cancelPayment(id: String): Observable<String>{
    return this.httpClient.post<String>(this.stripeURL + "cancel/" + id, {}, cabecera);
  }

}
