import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayReservation } from '../interfaces/Reservations/dayReservation';
import { RecursiveReservation } from '../interfaces/Reservations/recursiveReservation';
import { Reservation } from '../interfaces/Reservations/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  getReservationsByRoomByDay(roomid : number, day : Date) {
    return this.http.get<number[]>("http://localhost:9090/api/reservation/room/" + roomid +"/day/" + day.toLocaleDateString("es-ES"));
  }

  addNewReservation(reservation : Reservation){
    return this.http.post("http://localhost:9090/api/reservation/add/normalReservation", reservation, { responseType: "text" });
  }

  getReservationsByUserId(userid : number){
    return this.http.get<Reservation[]>("http://localhost:9090/api/reservation/myReservations/" + userid);
  }

  addRecursiveReservation(reservation : RecursiveReservation){
    return this.http.post("http://localhost:9090/api/reservation/add/reservation/recursive", reservation, { responseType: "text" });
  }

  addDayReservation(reservation : DayReservation){
    return this.http.post("http://localhost:9090/api/reservation/add/reservation/byDays", reservation, { responseType: "text" });
  }

  deleteReservation(reservationId : number){
    return this.http.delete("http://localhost:9090/api/reservation/delete/" + reservationId, {responseType: "text" });
  }
}
