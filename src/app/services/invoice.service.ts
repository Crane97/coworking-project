import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../interfaces/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http : HttpClient) { }

  getInvoiceByReservationId(reservationId : number){
    return this.http.get<Invoice>("http://localhost:9090/api/invoice/reservation/" + reservationId);
  }
}
