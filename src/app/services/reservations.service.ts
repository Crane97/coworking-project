import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  getReservationsByRoomByDay(roomid : number, day : String) : Observable<String[]>{
    return this.http.get<String[]>("http://localhost:9090/api/reservation/room/" + roomid +"/day/" + day);
  }
}
