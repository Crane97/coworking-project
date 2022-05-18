import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  getReservationsByRoomByDay(roomid : number, day : Date) {
    return this.http.get<number[]>("http://localhost:9090/api/reservation/room/" + roomid +"/day/" + day.toLocaleDateString("es-ES"));
  }

  addNewReservation(reservation : Reservation){
    return this.http.post("http://localhost:9090/api/reservation/add", reservation, { responseType: "text" });
  }
}
