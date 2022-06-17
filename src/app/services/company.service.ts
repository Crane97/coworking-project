import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../interfaces/company';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companyURL = 'http://localhost:9090/api/company';

  constructor(private http: HttpClient) { }

  getAllCompanies(page : number){
    var params = new HttpParams().set("page", page);
    return this.http.get<Company>(this.companyURL);
  }

  associateUserToCompany(companyId : number, user : Usuario){
    return this.http.put<Company>(this.companyURL+"/addUserToCompany/" + companyId, user)
  }
}
