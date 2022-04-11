import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    getAllUsers(page: number): Observable<Usuario> {
      var reqHeader = new HttpHeaders({
        //'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')
      });
      var params = new HttpParams().set("page", page);
      //console.log(params.get("page"))
      return this.http.get<Usuario>("http://localhost:9090/api/user/publicableUsers", { headers: reqHeader, params: params });
    }

    createUser(user : Usuario) {
    return this.http.post("http://localhost:9090/api/user/add", user, { responseType: "text" });
    }
  }
  