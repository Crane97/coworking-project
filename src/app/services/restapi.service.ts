import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/room';
import { Token } from '../interfaces/token';
import { Usuario } from '../interfaces/usuario';
import * as jwt_decode from 'jwt-decode';



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

    userLogged(){
      let token = this.getTokenInfo();
      var decoded : any ;

      if(token){
        decoded = jwt_decode(token);
        console.log(token, decoded);
        console.log(decoded.sub);
      }

      return decoded;
    }

    getTokenInfo(){
      var reqHeader = new HttpHeaders({
        //'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')
      });
      const jwtoken = localStorage.getItem("JWTtoken");
      console.log(jwtoken);
      return localStorage.getItem('JWTtoken');
    }

    getTokenExpirationDate(token: string): Date {
      var decoded:any = jwt_decode(token);
      if (decoded.exp === undefined) return null;
  
      const date = new Date(0); 
      date.setUTCSeconds(decoded.exp);
      return date;
    }
  
    isTokenExpired(token?: string): boolean {
      if(!token) token = this.getTokenInfo();
      if(!token) return true;
  
      const date = this.getTokenExpirationDate(token);
      if(date === undefined) return false;
      return !(date.valueOf() > new Date().valueOf());
    }

    logout() {
      localStorage.removeItem("JWTtoken");
    }
  }
  