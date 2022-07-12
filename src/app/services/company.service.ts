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

  getWorkersForCompany(page:number, companyId : number){
    var params = new HttpParams().set("page", page);
    return this.http.get<Company>(this.companyURL+"/workers/"+companyId);
  }

  associateUserToCompany(companyId : number, user : Usuario){
    return this.http.put<Company>(this.companyURL+"/addUserToCompany/" + companyId, user)
  }

  createNewCompanie(company : Company){
    return this.http.post<Company>(this.companyURL+"/add", company)
  }

  disassociateUserToCompany(companyId : number, user : Usuario){
    return this.http.put<Company>(this.companyURL+"/deleteUserFromCompany/"+companyId, user);
  }

  selectNewAdmin(companyId : number, userId : number){
    return this.http.put<Company>(this.companyURL+"/selectNewAdmin/"+companyId+"/"+ userId,"");
  }

  deleteCompany(companyId : number){
    return this.http.delete(this.companyURL+"/delete/"+ companyId);
  }
}
