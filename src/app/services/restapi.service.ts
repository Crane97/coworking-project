import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/room';
import { Token } from '../interfaces/token';
import { Usuario } from '../interfaces/usuario';



@Injectable({
    providedIn: 'root'
  })
  export class RestapiService {
  
    constructor(private http: HttpClient) { }
  
    login(username: string, password: string): Observable<Token> {
      let options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
      let body = new URLSearchParams();
      body.set('username', username);
      body.set('password', password);
      return this.http.post<Token>("http://localhost:9090/login", body.toString(), options);
    }

    getTokenInfo(){
      var reqHeader = new HttpHeaders({
        //'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')
      });
      const jwtoken = localStorage.getItem("JWTtoken");
      const sub = JSON.parse(jwtoken);
      console.log(jwtoken);
      console.log(sub);
      return localStorage.getItem('JWTtoken');
    }

    getAllUsers(page: number): Observable<Usuario> {
      /*
      ESTE CÓDIGO SOLO SE UTILIZARÁ PARA LAS LLAMADAS EN LAS QUE SEA NECESARIO ESTAR LOGGEADO
      var reqHeader = new HttpHeaders({
        //'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')
      });
      */
      var params = new HttpParams().set("page", page);
      //console.log(params.get("page"))
      return this.http.get<Usuario>("http://localhost:9090/api/user/publicableUsers", { params: params });
    }

    createUser(user : Usuario) {
      return this.http.post("http://localhost:9090/api/user/add", user, { responseType: "text" });
    }

    logout() {
      localStorage.removeItem("JWTtoken");
    }

    getAllRooms(page : number){
      //console.log(params.get("page"))
      var params = new HttpParams().set("page", page);
      return this.http.get<Room>("http://localhost:9090/api/room/rooms");
    }
  }
  