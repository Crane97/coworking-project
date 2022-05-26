import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Usuario> {
    //console.log(params.get("page"))
    return this.http.get<Usuario>("http://localhost:9090/api/user/users");
  }

  getPublicableUsers(): Observable<Usuario> {
    /*
    ESTE CÓDIGO SOLO SE UTILIZARÁ PARA LAS LLAMADAS EN LAS QUE SEA NECESARIO ESTAR LOGGEADO
    var reqHeader = new HttpHeaders({
      //'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')
    });
    */
    //console.log(params.get("page"))
    return this.http.get<Usuario>("http://localhost:9090/api/user/publicableUsers");
  }

  createUser(user : Usuario) {
    return this.http.post("http://localhost:9090/api/user/add", user, { responseType: "text" });
  }

  getUser(id : number){
    var reqHeader = new HttpHeaders({
      //'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')
    });
    const url = "http://localhost:9090/api/user/" + id;
    //console.log(params.get("page"))
    return this.http.get<Usuario>(url);
  }

  getUserByUsername(username : String){
    var reqHeader = new HttpHeaders({
      //'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')
    });
    const url = "http://localhost:9090/api/user/username/" + username;
    //console.log(params.get("page"))
    return this.http.get<Usuario>(url);
  }

  updateUser(id : number, user : Usuario){
    return this.http.put("http://localhost:9090/api/update/" + id, user, { responseType: "text" });
  }
}
