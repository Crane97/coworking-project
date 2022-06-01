import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../interfaces/invoice';
import { ReservationPayment } from '../interfaces/Reservations/reservationPayment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http : HttpClient) { }

  getReservationPaymentByReservationId(reservationId : number){
    return this.http.get<ReservationPayment>("http://localhost:9090/api/invoice/ReservationInvoice/" + reservationId);
  }

  updatePayAtDoor(id: number){
    return this.http.put("http://localhost:9090/api/invoice/update/"+id,{});
  }
}
