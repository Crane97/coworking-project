import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from './interfaces/token';



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
  }
  