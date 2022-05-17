import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  getReservationsByRoomByDay(roomid : number, day : Date) {
    return this.http.get<number[]>("http://localhost:9090/api/reservation/room/" + roomid +"/day/" + day.toLocaleDateString("es-ES"));
  }
}
