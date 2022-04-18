import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }

  getAllRooms(page : number){
    //console.log(params.get("page"))
    var params = new HttpParams().set("page", page);
    return this.http.get<Room>("http://localhost:9090/api/room/rooms");
  }

  getRoom(id : number){
    var reqHeader = new HttpHeaders({
      //'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')
    });
    const url = "http://localhost:9090/api/room/" + id;
    return this.http.get<Room>(url);
  }
}
